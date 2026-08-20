from __future__ import annotations

import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fastapi import Header, HTTPException


def require_developer(authorization: str | None = Header(default=None)) -> dict:
    """Validate the caller's Supabase session and require the developer role.

    The browser sends the user's access token. The service-role key is used only
    server-side as the Supabase API key; it is never returned or logged.
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
            user = __import__("json").loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        if exc.code in {401, 403}:
            raise HTTPException(status_code=401, detail="Invalid or expired developer session") from exc
        raise HTTPException(status_code=503, detail="Developer authentication service unavailable") from exc
    except (URLError, OSError, ValueError) as exc:
        raise HTTPException(status_code=503, detail="Developer authentication service unavailable") from exc

    metadata = user.get("app_metadata") or {}
    if metadata.get("role") != "developer" and metadata.get("voxvector_role") != "developer":
        raise HTTPException(status_code=403, detail="Developer role required")
    return user
