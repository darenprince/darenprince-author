from __future__ import annotations

import json
import os
import time
from dataclasses import dataclass
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


class StorageError(RuntimeError):
    """Raised when the configured durable storage backend cannot be reached."""


@dataclass(frozen=True)
class StorageConfig:
    provider: str = os.getenv("VOXVECTOR_STORAGE_PROVIDER", "supabase").strip().lower()
    supabase_url: str = os.getenv("SUPABASE_URL", "").rstrip("/")
    service_role_key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    bucket: str = os.getenv("VOXVECTOR_LOG_BUCKET", "voxvector-logs").strip()
    media_bucket: str = os.getenv("VOXVECTOR_MEDIA_BUCKET", "voxvector-media").strip()
    timeout_seconds: float = float(os.getenv("VOXVECTOR_STORAGE_TIMEOUT_SECONDS", "10"))
    media_max_bytes: int = int(os.getenv("VOXVECTOR_MEDIA_MAX_BYTES", str(250 * 1024 * 1024)))

    @property
    def configured(self) -> bool:
        return bool(self.provider == "supabase" and self.supabase_url and self.service_role_key and self.bucket)

    @property
    def media_configured(self) -> bool:
        return bool(self.provider == "supabase" and self.supabase_url and self.service_role_key and self.media_bucket)


class SupabaseStorage:
    """Small dependency-free Supabase Storage client for trusted server-side reads/writes."""

    def __init__(self, config: StorageConfig | None = None):
        self.config = config or StorageConfig()
        self._bucket_ready = False
        self._media_bucket_ready = False

    @property
    def configured(self) -> bool:
        return self.config.configured

    @property
    def media_configured(self) -> bool:
        return self.config.media_configured

    def status(self) -> str:
        if self.config.provider != "supabase":
            return "unsupported_provider"
        if not self.config.configured:
            return "not_configured"
        return "configured_media_ready" if self.config.media_configured else "configured"

    def _request(self, method: str, url: str, body: bytes | None = None, content_type: str | None = None, *, retries: int = 0):
        if not self.config.configured:
            raise StorageError("Durable storage is not configured")
        headers = {
            "Authorization": f"Bearer {self.config.service_role_key}",
            "apikey": self.config.service_role_key,
        }
        if content_type:
            headers["Content-Type"] = content_type
        request = Request(url, data=body, headers=headers, method=method)
        attempt = 0
        while True:
            try:
                with urlopen(request, timeout=self.config.timeout_seconds) as response:
                    return response.status, response.read()
            except HTTPError as exc:
                detail = exc.read(1024).decode("utf-8", errors="replace")
                if exc.code in {429, 502, 503, 504} and attempt < retries:
                    time.sleep(0.4 * (2 ** attempt))
                    attempt += 1
                    continue
                raise StorageError(f"Supabase Storage HTTP {exc.code}: {detail}") from exc
            except URLError as exc:
                if attempt < retries:
                    time.sleep(0.4 * (2 ** attempt))
                    attempt += 1
                    continue
                raise StorageError(f"Supabase Storage connection error: {exc.reason}") from exc
            except OSError as exc:
                if attempt < retries:
                    time.sleep(0.4 * (2 ** attempt))
                    attempt += 1
                    continue
                raise StorageError(f"Supabase Storage I/O error: {exc}") from exc

    def _ensure_bucket(self, bucket: str, file_size_limit: int, allowed_mime_types: list[str] | None, ready_attr: str) -> None:
        if getattr(self, ready_attr):
            return
        if not self.config.configured:
            raise StorageError("Durable storage is not configured")

        bucket_url = f"{self.config.supabase_url}/storage/v1/bucket/{quote(bucket, safe='')}"
        try:
            status, _ = self._request("GET", bucket_url, retries=1)
            if status == 200:
                setattr(self, ready_attr, True)
                return
        except StorageError as exc:
            if "HTTP 404" not in str(exc):
                raise

        create_url = f"{self.config.supabase_url}/storage/v1/bucket"
        payload = json.dumps({
            "id": bucket,
            "name": bucket,
            "public": False,
            "file_size_limit": file_size_limit,
            "allowed_mime_types": allowed_mime_types,
        }).encode("utf-8")
        try:
            self._request("POST", create_url, payload, "application/json", retries=2)
        except StorageError as exc:
            if "HTTP 409" not in str(exc) and "already exists" not in str(exc).lower():
                raise
        setattr(self, ready_attr, True)

    def ensure_bucket(self) -> None:
        self._ensure_bucket(
            self.config.bucket,
            1 * 1024 * 1024,
            ["application/json"],
            "_bucket_ready",
        )

    def ensure_media_bucket(self) -> None:
        if not self.config.media_configured:
            raise StorageError("Media storage is not configured")
        self._ensure_bucket(
            self.config.media_bucket,
            self.config.media_max_bytes,
            ["audio/wav", "audio/x-wav", "audio/wave", "application/octet-stream"],
            "_media_bucket_ready",
        )

    @staticmethod
    def _validate_object_path(object_path: str) -> None:
        if not object_path or object_path.startswith("/") or ".." in object_path.split("/"):
            raise ValueError("Invalid storage object path")

    def put_json(self, object_path: str, payload: dict) -> str:
        self._validate_object_path(object_path)
        self.ensure_bucket()
        encoded_path = quote(object_path, safe="/")
        url = f"{self.config.supabase_url}/storage/v1/object/{quote(self.config.bucket, safe='')}/{encoded_path}"
        body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self._request("POST", url, body, "application/json", retries=2)
        return f"{self.config.bucket}/{object_path}"

    def put_bytes(self, object_path: str, body: bytes, content_type: str = "application/octet-stream") -> str:
        self._validate_object_path(object_path)
        if len(body) <= 0:
            raise StorageError("Media object is empty")
        if len(body) > self.config.media_max_bytes:
            raise StorageError("Media object exceeds configured size limit")
        if not self.media_configured:
            raise StorageError("Media storage is not configured")
        self.ensure_media_bucket()
        encoded_path = quote(object_path, safe="/")
        url = f"{self.config.supabase_url}/storage/v1/object/{quote(self.config.media_bucket, safe='')}/{encoded_path}"
        normalized_type = content_type if content_type in {"audio/wav", "audio/x-wav", "audio/wave", "application/octet-stream"} else "audio/wav"
        self._request("POST", url, body, normalized_type, retries=2)
        return f"{self.config.media_bucket}/{object_path}"

    def create_signed_url(self, object_path: str, expires_seconds: int = 900) -> str:
        self._validate_object_path(object_path)
        if not self.config.media_configured:
            raise StorageError("Media storage is not configured")
        self.ensure_media_bucket()
        expires_seconds = max(60, min(int(expires_seconds), 86_400))
        encoded_path = quote(object_path, safe="/")
        url = f"{self.config.supabase_url}/storage/v1/object/sign/{quote(self.config.media_bucket, safe='')}/{encoded_path}"
        body = json.dumps({"expiresIn": expires_seconds}).encode("utf-8")
        _, raw = self._request("POST", url, body, "application/json", retries=2)
        try:
            payload = json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise StorageError("Signed URL response is not valid JSON") from exc
        signed = payload.get("signedURL") or payload.get("signedUrl")
        if not signed:
            raise StorageError("Supabase did not return a signed media URL")
        return signed if str(signed).startswith("http") else f"{self.config.supabase_url}/storage/v1{signed}"

    def get_bytes(self, object_path: str) -> bytes:
        self._validate_object_path(object_path)
        if not self.config.media_configured:
            raise StorageError("Media storage is not configured")
        self.ensure_media_bucket()
        encoded_path = quote(object_path, safe="/")
        url = f"{self.config.supabase_url}/storage/v1/object/{quote(self.config.media_bucket, safe='')}/{encoded_path}"
        _, body = self._request("GET", url, retries=2)
        return body

    def list_json(self, prefix: str, limit: int = 100, offset: int = 0) -> list[dict]:
        """List storage entries below a prefix; entries may be folders or JSON objects."""
        if not prefix or prefix.startswith("/") or ".." in prefix.split("/"):
            raise ValueError("Invalid storage prefix")
        limit = max(1, min(int(limit), 1000))
        offset = max(0, int(offset))
        url = f"{self.config.supabase_url}/storage/v1/object/list/{quote(self.config.bucket, safe='')}"
        body = json.dumps({
            "prefix": prefix.rstrip("/") + "/",
            "limit": limit,
            "offset": offset,
            "sortBy": {"column": "created_at", "order": "desc"},
        }).encode("utf-8")
        _, raw = self._request("POST", url, body, "application/json", retries=2)
        try:
            payload = json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise StorageError("Supabase Storage list response is not valid JSON") from exc
        if not isinstance(payload, list):
            raise StorageError("Supabase Storage list response has an unexpected shape")
        return [item for item in payload if isinstance(item, dict)]

    def get_json(self, object_path: str) -> dict:
        self._validate_object_path(object_path)
        encoded_path = quote(object_path, safe="/")
        url = f"{self.config.supabase_url}/storage/v1/object/{quote(self.config.bucket, safe='')}/{encoded_path}"
        _, body = self._request("GET", url, retries=2)
        try:
            return json.loads(body.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise StorageError("Stored object is not valid JSON") from exc
