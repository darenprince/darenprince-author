from __future__ import annotations

import json
import os
from datetime import datetime, timedelta, timezone
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request as UrlRequest, urlopen

from fastapi import APIRouter, Depends, HTTPException, Query

from .auth import require_developer

RENDER_API_BASE = "https://api.render.com/v1"
render_router = APIRouter(prefix="/v1/developer/render", tags=["developer-render"])


def _config(service_id: str | None = None) -> tuple[str, str]:
    api_key = os.getenv("RENDER_API_KEY", "").strip()
    resolved_service = (service_id or os.getenv("RENDER_SERVICE_ID", "")).strip()
    if not api_key:
        raise HTTPException(status_code=503, detail="Render API bridge is not configured on the API runtime.")
    if not resolved_service:
        raise HTTPException(status_code=503, detail="Render service ID is not configured on the API runtime.")
    return api_key, resolved_service


def _deploy_hook_url() -> str:
    value = os.getenv("RENDER_DEPLOY_HOOK_URL", "").strip()
    if not value:
        raise HTTPException(status_code=503, detail="Render deploy hook is not configured on the API runtime.")
    return value


def _trigger_deploy_hook() -> dict:
    hook_url = _deploy_hook_url()
    request = UrlRequest(
        hook_url,
        data=b"",
        headers={"Accept": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=20) as response:
            raw = response.read().decode("utf-8", errors="replace")
            payload = json.loads(raw) if raw else {}
            return {"response_status": getattr(response, "status", 200), "payload": payload}
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise HTTPException(status_code=502, detail=f"Render deploy hook returned HTTP {exc.code}: {detail[:240]}") from exc
    except (URLError, TimeoutError) as exc:
        raise HTTPException(status_code=502, detail="Unable to reach the configured Render deploy hook.") from exc


def _render_get(path: str, api_key: str, params: dict | None = None) -> dict | list:
    query = f"?{urlencode(params or {}, doseq=True)}" if params else ""
    request = UrlRequest(
        f"{RENDER_API_BASE}{path}{query}",
        headers={"Authorization": f"Bearer {api_key}", "Accept": "application/json"},
        method="GET",
    )
    try:
        with urlopen(request, timeout=20) as response:
            raw = response.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise HTTPException(status_code=502, detail=f"Render API returned HTTP {exc.code}: {detail[:240]}") from exc
    except (URLError, TimeoutError) as exc:
        raise HTTPException(status_code=502, detail="Unable to reach the Render API.") from exc


def _rows(payload: dict | list) -> list[dict]:
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if not isinstance(payload, dict):
        return []
    for key in ("items", "data", "deploys", "logs", "services"):
        value = payload.get(key)
        if isinstance(value, list):
            return [item for item in value if isinstance(item, dict)]
    return []


def _object(payload: dict | list, *keys: str) -> dict:
    if not isinstance(payload, dict):
        return {}
    for key in keys:
        value = payload.get(key)
        if isinstance(value, dict):
            return value
    return payload


def _scalar(value):
    if value is None or isinstance(value, (str, int, float, bool)):
        return value
    return None


def _text(value, fallback: str = "") -> str:
    if isinstance(value, str):
        return value
    if value is None:
        return fallback
    if isinstance(value, (int, float, bool)):
        return str(value)
    if isinstance(value, dict):
        for key in ("message", "text", "event", "name", "detail"):
            candidate = value.get(key)
            if isinstance(candidate, str) and candidate.strip():
                return candidate
        try:
            return json.dumps(value, separators=(",", ":"), ensure_ascii=False)[:1200]
        except (TypeError, ValueError):
            return fallback
    return fallback


def _normalize_log(record: dict) -> dict:
    message = _text(record.get("message") or record.get("text") or record.get("event") or record.get("data"), "Render log event")
    timestamp = _scalar(record.get("timestamp") or record.get("time") or record.get("createdAt") or record.get("created_at"))
    return {
        "message": message,
        "timestamp": timestamp,
        "level": _scalar(record.get("level")),
        "type": _scalar(record.get("type")),
        "raw": record,
    }


def _owner_id(service: dict) -> str | None:
    direct = service.get("ownerId") or service.get("owner_id")
    if direct:
        return str(direct)
    owner = service.get("owner")
    if isinstance(owner, dict) and owner.get("id"):
        return str(owner["id"])
    return None


@render_router.get("/status")
def render_status(
    service_id: str | None = Query(default=None),
    log_minutes: int = Query(default=30, ge=1, le=120),
    _: dict = Depends(require_developer),
):
    api_key, resolved_service = _config(service_id)
    service_payload = _render_get(f"/services/{resolved_service}", api_key)
    service = _object(service_payload, "service", "data")
    details = service.get("serviceDetails") if isinstance(service.get("serviceDetails"), dict) else {}
    deploy_payload = _render_get(f"/services/{resolved_service}/deploys", api_key, {"limit": 5})
    deploys = _rows(deploy_payload)
    instances_payload = _render_get(f"/services/{resolved_service}/instances", api_key, {"limit": 20})
    instance_rows = _rows(instances_payload)
    return {
        "status": "ok",
        "service": {
            "id": service.get("id") or resolved_service,
            "name": service.get("name"),
            "type": service.get("type"),
            "suspended": _scalar(service.get("suspended")),
            "state": _text(service.get("state") or service.get("status") or service.get("serviceState") or ("suspended" if service.get("suspended") else "active")),
            "url": _text(service.get("url") or service.get("serviceUrl") or details.get("url")),
            "owner_id": _owner_id(service),
            "region": _text(service.get("region") or service.get("regionName") or details.get("region")),
        },
        "latest_deploy": deploys[0] if deploys else {},
        "deploys": deploys,
        "instances": instance_rows,
        "observed_at": datetime.now(timezone.utc).isoformat(),
        "log_window_minutes": log_minutes,
    }


@render_router.post("/deploy")
def render_deploy(_: dict = Depends(require_developer)):
    result = _trigger_deploy_hook()
    return {
        "status": "accepted",
        "trigger": "render_deploy_hook",
        "response_status": result["response_status"],
        "triggered_at": datetime.now(timezone.utc).isoformat(),
    }


@render_router.get("/logs")
def render_logs(
    service_id: str | None = Query(default=None),
    minutes: int = Query(default=10, ge=1, le=60),
    limit: int = Query(default=120, ge=1, le=100),
    _: dict = Depends(require_developer),
):
    api_key, resolved_service = _config(service_id)
    service_payload = _render_get(f"/services/{resolved_service}", api_key)
    service = service_payload if isinstance(service_payload, dict) else {}
    owner_id = _owner_id(service)
    if not owner_id:
        raise HTTPException(status_code=502, detail="Render service response did not include a workspace owner ID for log queries.")
    end = datetime.now(timezone.utc)
    start = end - timedelta(minutes=minutes)
    payload = _render_get(
        "/logs",
        api_key,
        {
            "ownerId": owner_id,
            "startTime": start.isoformat().replace("+00:00", "Z"),
            "endTime": end.isoformat().replace("+00:00", "Z"),
            "direction": "backward",
            "resource": resolved_service,
            "limit": min(limit, 100),
            "type": ["app", "request", "build"],
        },
    )
    return {
        "status": "ok",
        "service_id": resolved_service,
        "owner_id": owner_id,
        "logs": [_normalize_log(record) for record in _rows(payload)],
        "observed_at": end.isoformat(),
    }
