import json

import pytest
from fastapi import HTTPException

from api import auth


class FakeResponse:
    def __init__(self, payload):
        self.payload = payload

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return False

    def read(self):
        return json.dumps(self.payload).encode("utf-8")


def configure(monkeypatch, payload):
    monkeypatch.setenv("SUPABASE_URL", "https://example.supabase.co")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "server-only-test-key")
    monkeypatch.setattr(auth, "urlopen", lambda *_args, **_kwargs: FakeResponse(payload))


def test_require_developer_accepts_trusted_developer_role(monkeypatch):
    configure(monkeypatch, {"id": "dev-1", "app_metadata": {"voxvector_role": "developer"}})
    user = auth.require_developer("Bearer token")
    assert user["id"] == "dev-1"


def test_require_developer_accepts_trusted_admin_role(monkeypatch):
    configure(monkeypatch, {"id": "admin-1", "app_metadata": {"role": "admin"}})
    user = auth.require_developer("Bearer token")
    assert user["id"] == "admin-1"


def test_require_developer_rejects_approved_user_role(monkeypatch):
    configure(monkeypatch, {"id": "user-1", "app_metadata": {"voxvector_role": "user"}})
    with pytest.raises(HTTPException) as exc:
        auth.require_developer("Bearer token")
    assert exc.value.status_code == 403


def test_require_developer_ignores_user_editable_metadata(monkeypatch):
    configure(monkeypatch, {"id": "user-2", "app_metadata": {}, "user_metadata": {"role": "admin"}})
    with pytest.raises(HTTPException) as exc:
        auth.require_developer("Bearer token")
    assert exc.value.status_code == 403


def test_require_developer_requires_bearer_token():
    with pytest.raises(HTTPException) as exc:
        auth.require_developer(None)
    assert exc.value.status_code == 401
