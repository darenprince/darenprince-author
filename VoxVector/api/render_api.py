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
    for key in ("items", "data", "deploys", "logs", "services"):
        value = payload.get(key) if isinstance(payload, dict) else None
        if isinstance(value, list):
            return [item for item in value if isinstance(item, dict)]
    return []


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
    service = service_payload if isinstance(service_payload, dict) else {}
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
            "suspended": service.get("suspended"),
            "url": service.get("url"),
            "owner_id": _owner_id(service),
            "region": service.get("region"),
        },
        "latest_deploy": deploys[0] if deploys else {},
        "deploys": deploys,
        "instances": instance_rows,
        "observed_at": datetime.now(timezone.utc).isoformat(),
        "log_window_minutes": log_minutes,
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
        "logs": _rows(payload),
        "observed_at": end.isoformat(),
    }
