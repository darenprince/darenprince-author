from __future__ import annotations

import json
import os
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
    timeout_seconds: float = float(os.getenv("VOXVECTOR_STORAGE_TIMEOUT_SECONDS", "5"))

    @property
    def configured(self) -> bool:
        return bool(self.provider == "supabase" and self.supabase_url and self.service_role_key and self.bucket)


class SupabaseStorage:
    """Small dependency-free Supabase Storage client for trusted server-side reads/writes."""

    def __init__(self, config: StorageConfig | None = None):
        self.config = config or StorageConfig()
        self._bucket_ready = False

    @property
    def configured(self) -> bool:
        return self.config.configured

    def status(self) -> str:
        if self.config.provider != "supabase":
            return "unsupported_provider"
        return "configured" if self.config.configured else "not_configured"

    def _request(self, method: str, url: str, body: bytes | None = None, content_type: str | None = None):
        if not self.config.configured:
            raise StorageError("Durable storage is not configured")
        headers = {
            "Authorization": f"Bearer {self.config.service_role_key}",
            "apikey": self.config.service_role_key,
        }
        if content_type:
            headers["Content-Type"] = content_type
        request = Request(url, data=body, headers=headers, method=method)
        try:
            with urlopen(request, timeout=self.config.timeout_seconds) as response:
                return response.status, response.read()
        except HTTPError as exc:
            detail = exc.read(512).decode("utf-8", errors="replace")
            raise StorageError(f"Supabase Storage HTTP {exc.code}: {detail}") from exc
        except URLError as exc:
            raise StorageError(f"Supabase Storage connection error: {exc.reason}") from exc
        except OSError as exc:
            raise StorageError(f"Supabase Storage I/O error: {exc}") from exc

    def ensure_bucket(self) -> None:
        if self._bucket_ready:
            return
        bucket_url = f"{self.config.supabase_url}/storage/v1/bucket"
        payload = json.dumps({
            "id": self.config.bucket,
            "name": self.config.bucket,
            "public": False,
            "file_size_limit": "1MB",
            "allowed_mime_types": ["application/json"],
        }).encode("utf-8")
        try:
            self._request("POST", bucket_url, payload, "application/json")
        except StorageError as exc:
            if "HTTP 409" not in str(exc) and "already exists" not in str(exc).lower():
                raise
        self._bucket_ready = True

    def put_json(self, object_path: str, payload: dict) -> str:
        if not object_path or object_path.startswith("/") or ".." in object_path.split("/"):
            raise ValueError("Invalid storage object path")
        self.ensure_bucket()
        encoded_path = quote(object_path, safe="/")
        url = f"{self.config.supabase_url}/storage/v1/object/{quote(self.config.bucket, safe='')}/{encoded_path}"
        body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self._request("POST", url, body, "application/json")
        return f"{self.config.bucket}/{object_path}"

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
        _, raw = self._request("POST", url, body, "application/json")
        try:
            payload = json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise StorageError("Supabase Storage list response is not valid JSON") from exc
        if not isinstance(payload, list):
            raise StorageError("Supabase Storage list response has an unexpected shape")
        return [item for item in payload if isinstance(item, dict)]

    def get_json(self, object_path: str) -> dict:
        if not object_path or object_path.startswith("/") or ".." in object_path.split("/"):
            raise ValueError("Invalid storage object path")
        encoded_path = quote(object_path, safe="/")
        url = f"{self.config.supabase_url}/storage/v1/object/{quote(self.config.bucket, safe='')}/{encoded_path}"
        _, body = self._request("GET", url)
        try:
            return json.loads(body.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise StorageError("Stored object is not valid JSON") from exc
