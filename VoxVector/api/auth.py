from __future__ import annotations

import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fastapi import Header, HTTPException


_OPERATOR_ROLES = {"developer", "admin"}


def _trusted_voxvector_role(user: dict) -> str | None:
    metadata = user.get("app_metadata") or {}
    role = str(metadata.get("voxvector_role") or metadata.get("role") or "").strip().lower()
    return role or None


def require_developer(authorization: str | None = Header(default=None)) -> dict:
    """Validate the caller's Supabase session and require a trusted operator role.

    The browser sends the user's access token. The service-role key is used only
    server-side as the Supabase API key; it is never returned or logged. The
    historical dependency name remains stable for existing developer routes,
    while both trusted ``developer`` and ``admin`` roles are authorized.
    """
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Developer authentication required")

    token = authorization.split(" ", 1)[1].strip()
    supabase_url = os.getenv("SUPABASE_URL", "").rstrip("/")
    service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    if not supabase_url or not service_role_key:
        raise HTTPException(status_code=503, detail="Developer authentication is not configured")

    request = Request(
        f"{supabase_url}/auth/v1/user",
        headers={
            "apikey": service_role_key,
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
        },
        method="GET",
    )
    try:
        with urlopen(request, timeout=5) as response:
            user = json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        if exc.code in {401, 403}:
            raise HTTPException(status_code=401, detail="Invalid or expired developer session") from exc
        raise HTTPException(status_code=503, detail="Developer authentication service unavailable") from exc
    except (URLError, OSError, ValueError) as exc:
        raise HTTPException(status_code=503, detail="Developer authentication service unavailable") from exc

    if _trusted_voxvector_role(user) not in _OPERATOR_ROLES:
        raise HTTPException(status_code=403, detail="Developer or admin role required")
    return user
