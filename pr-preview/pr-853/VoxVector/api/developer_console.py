from __future__ import annotations

import json
import os
import pathlib
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse
from pydantic import BaseModel

PROJECT_ROOT = pathlib.Path(__file__).resolve().parents[1]
HTML_PATH = pathlib.Path(__file__).resolve().parent / "developer_console.html"
DOCS_ROOT = PROJECT_ROOT / "docs"
SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
SUPABASE_PUBLISHABLE_KEY = os.getenv("SUPABASE_PUBLISHABLE_KEY", os.getenv("SUPABASE_ANON_KEY", ""))
LOG_BUCKET = os.getenv("VOXVECTOR_LOG_BUCKET", "voxvector-logs")

router = APIRouter()


class LoginPayload(BaseModel):
    email: str
    password: str


def _headers(token: str | None = None) -> dict[str, str]:
    if not SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(503, "Developer console server authorization is not configured")
    result = {"apikey": SUPABASE_SERVICE_ROLE_KEY, "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}", "Content-Type": "application/json"}
    if token:
        result["Authorization"] = f"Bearer {token}"
    return result


def _request(url: str, *, method: str = "GET", headers: dict[str, str] | None = None, body: Any = None, timeout: float = 5) -> Any:
    data = None if body is None else json.dumps(body).encode()
    request = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            raw = response.read()
            return json.loads(raw.decode()) if raw else None
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode(errors="replace")
        raise HTTPException(exc.code, detail[:500]) from exc
    except urllib.error.URLError as exc:
        raise HTTPException(503, f"Supabase unavailable: {exc.reason}") from exc


def _user_from_token(token: str) -> dict[str, Any]:
    if not SUPABASE_URL:
        raise HTTPException(503, "SUPABASE_URL is not configured")
    return _request(f"{SUPABASE_URL}/auth/v1/user", headers=_headers(token))


def _require_developer(request: Request) -> dict[str, Any]:
    authorization = request.headers.get("authorization", "")
    if not authorization.lower().startswith("bearer "):
        raise HTTPException(401, "Developer authentication required")
    user = _user_from_token(authorization.split(" ", 1)[1].strip())
    user_id = user.get("id")
    if not user_id:
        raise HTTPException(401, "Invalid developer session")
    query = urllib.parse.urlencode({"select": "user_id,role,active", "user_id": f"eq.{user_id}", "active": "eq.true"})
    rows = _request(f"{SUPABASE_URL}/rest/v1/developer_roles?{query}", headers=_headers())
    if not rows:
        raise HTTPException(403, "Developer access is not authorized for this account")
    return {"user": user, "role": rows[0].get("role", "developer")}


@router.get("/developer")
def developer_console() -> FileResponse:
    return FileResponse(HTML_PATH, media_type="text/html")


@router.post("/developer/api/login")
def login(payload: LoginPayload):
    if not SUPABASE_URL or not SUPABASE_PUBLISHABLE_KEY:
        raise HTTPException(503, "Supabase browser authentication is not configured")
    query = urllib.parse.urlencode({"grant_type": "password"})
    session = _request(
        f"{SUPABASE_URL}/auth/v1/token?{query}",
        method="POST",
        headers={"apikey": SUPABASE_PUBLISHABLE_KEY, "Authorization": f"Bearer {SUPABASE_PUBLISHABLE_KEY}", "Content-Type": "application/json"},
        body={"email": payload.email, "password": payload.password},
    )
    access_token = session.get("access_token") if isinstance(session, dict) else None
    if not access_token:
        raise HTTPException(401, "Authentication failed")
    authorization = {"authorization": f"Bearer {access_token}"}
    user = _user_from_token(access_token)
    query = urllib.parse.urlencode({"select": "user_id,role,active", "user_id": f"eq.{user.get('id')}", "active": "eq.true"})
    rows = _request(f"{SUPABASE_URL}/rest/v1/developer_roles?{query}", headers=_headers())
    if not rows:
        raise HTTPException(403, "Authenticated, but this account is not a VoxVector developer")
    return {"access_token": access_token, "user": user, "role": rows[0].get("role", "developer")}


@router.get("/developer/api/session")
def session(request: Request):
    access = _require_developer(request)
    return {"authenticated": True, "user": access["user"], "role": access["role"]}


@router.get("/developer/api/overview")
def overview(request: Request):
    access = _require_developer(request)
    health = _request("http://127.0.0.1/health", timeout=2) if False else None
    errors = _request(f"{SUPABASE_URL}/rest/v1/error_reports?select=*&order=occurred_at.desc&limit=20", headers=_headers())
    roadmap = _request(f"{SUPABASE_URL}/rest/v1/roadmap_items?select=*&order=priority.asc,updated_at.desc&limit=30", headers=_headers())
    return {"user": access["user"], "role": access["role"], "pipeline": os.getenv("VOXVECTOR_PIPELINE_VERSION", "runtime"), "errors": errors, "roadmap": roadmap, "storage_bucket": LOG_BUCKET}


@router.get("/developer/api/errors")
def errors(request: Request):
    _require_developer(request)
    query = urllib.parse.urlencode({"select": "*", "order": "occurred_at.desc", "limit": "100"})
    return _request(f"{SUPABASE_URL}/rest/v1/error_reports?{query}", headers=_headers())


@router.get("/developer/api/roadmap")
def roadmap(request: Request):
    _require_developer(request)
    query = urllib.parse.urlencode({"select": "*", "order": "priority.asc,updated_at.desc", "limit": "100"})
    return _request(f"{SUPABASE_URL}/rest/v1/roadmap_items?{query}", headers=_headers())


@router.get("/developer/api/docs")
def docs(request: Request):
    _require_developer(request)
    items = []
    for path in sorted(DOCS_ROOT.glob("*.md")):
        items.append({"name": path.name, "title": path.stem.replace("_", " ").replace("-", " ").title()})
    return items


@router.get("/developer/api/docs/{name}")
def doc(name: str, request: Request):
    _require_developer(request)
    safe = pathlib.Path(name).name
    if not safe.endswith(".md"):
        safe += ".md"
    path = DOCS_ROOT / safe
    if not path.is_file():
        raise HTTPException(404, "Documentation file not found")
    return {"name": safe, "content": path.read_text(encoding="utf-8")}


@router.get("/developer/api/endpoints")
def endpoints(request: Request):
    _require_developer(request)
    routes = []
    for route in request.app.routes:
        methods = sorted(getattr(route, "methods", []) or [])
        path = getattr(route, "path", "")
        if path and methods:
            routes.append({"path": path, "methods": methods, "name": getattr(route, "name", "")})
    return sorted(routes, key=lambda item: item["path"])


@router.get("/developer/api/storage-events")
def storage_events(request: Request):
    _require_developer(request)
    body = {"prefix": "events/", "limit": 100, "sortBy": {"column": "name", "order": "desc"}}
    return _request(f"{SUPABASE_URL}/storage/v1/object/list/{urllib.parse.quote(LOG_BUCKET, safe='')}", method="POST", headers=_headers(), body=body)


@router.patch("/developer/api/errors/{error_id}/resolve")
def resolve_error(error_id: str, request: Request):
    access = _require_developer(request)
    query = urllib.parse.urlencode({"id": f"eq.{error_id}"})
    body = {"status": "resolved", "resolved_at": "now()", "resolved_by": access["user"]["id"]}
    # PostgREST does not evaluate SQL expressions in JSON, so use a server timestamp.
    from datetime import datetime, timezone
    body["resolved_at"] = datetime.now(timezone.utc).isoformat()
    return _request(f"{SUPABASE_URL}/rest/v1/error_reports?{query}", method="PATCH", headers={**_headers(), "Prefer": "return=representation"}, body=body)
