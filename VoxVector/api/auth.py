from __future__ import annotations

import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request as UrlRequest, urlopen

from fastapi import Header, HTTPException, Request


_OPERATOR_ROLES = {"developer", "admin"}
_ROLE_PERMISSION_DEFAULTS = {
    "admin": frozenset({
        "developer.console",
        "users.manage",
        "cases.manage",
        "deploy.manage",
        "diagnostics.read",
    }),
    "developer": frozenset({
        "developer.console",
        "cases.manage",
        "deploy.manage",
        "diagnostics.read",
    }),
    "user": frozenset({"user.workspace"}),
}


def _trusted_voxvector_role(user: dict) -> str | None:
    metadata = user.get("app_metadata") or {}
    role = str(metadata.get("voxvector_role") or metadata.get("role") or "").strip().lower()
    return role or None


def _trusted_voxvector_permissions(user: dict) -> frozenset[str]:
    """Return only explicit trusted permissions compatible with the trusted role.

    Role defaults are account-provisioning defaults, not an authorization fallback.
    Missing or malformed permission metadata therefore grants no permission.
    """
    role = _trusted_voxvector_role(user)
    allowed = _ROLE_PERMISSION_DEFAULTS.get(role or "", frozenset())
    metadata = user.get("app_metadata") or {}
    raw = metadata.get("voxvector_permissions")
    if not isinstance(raw, list):
        return frozenset()
    return frozenset(
        item.strip()
        for item in raw
        if isinstance(item, str) and item.strip() in allowed
    )


def required_permission_for_request(request: Request) -> str:
    """Map the existing protected API surface to its granular permission.

    Keeping the policy here preserves the current route definitions while making
    the long-standing ``require_developer`` dependency enforce the permission
    appropriate to the request being authorized.
    """
    path = request.url.path
    method = request.method.upper()
    if path.startswith("/v1/cases"):
        return "cases.manage"
    if path.startswith("/v1/diagnostics/"):
        return "diagnostics.read"
    if path == "/v1/developer/render/deploy" and method == "POST":
        return "deploy.manage"
    if path.startswith("/v1/developer/render/"):
        return "diagnostics.read"
    return "developer.console"


def require_developer(
    request: Request,
    authorization: str | None = Header(default=None),
) -> dict:
    """Validate Supabase identity, trusted operator role, and route permission.

    The browser sends the user's access token. The service-role key is used only
    server-side as the Supabase API key; it is never returned or logged. The
    historical dependency name remains stable for existing protected routes.
    """
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Developer authentication required")

    token = authorization.split(" ", 1)[1].strip()
    supabase_url = os.getenv("SUPABASE_URL", "").rstrip("/")
    service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    if not supabase_url or not service_role_key:
        raise HTTPException(status_code=503, detail="Developer authentication is not configured")

    auth_request = UrlRequest(
        f"{supabase_url}/auth/v1/user",
        headers={
            "apikey": service_role_key,
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
        },
        method="GET",
    )
    try:
        with urlopen(auth_request, timeout=5) as response:
            user = json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        if exc.code in {401, 403}:
            raise HTTPException(status_code=401, detail="Invalid or expired developer session") from exc
        raise HTTPException(status_code=503, detail="Developer authentication service unavailable") from exc
    except (URLError, OSError, ValueError) as exc:
        raise HTTPException(status_code=503, detail="Developer authentication service unavailable") from exc

    role = _trusted_voxvector_role(user)
    if role not in _OPERATOR_ROLES:
        raise HTTPException(status_code=403, detail="Developer or admin role required")

    required_permission = required_permission_for_request(request)
    permissions = _trusted_voxvector_permissions(user)
    if required_permission not in permissions:
        raise HTTPException(
            status_code=403,
            detail=f"VoxVector permission required: {required_permission}",
        )
    return user
