import json
from types import SimpleNamespace

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


class FakeRequest:
    def __init__(self, path="/v1/protected", method="GET"):
        self.url = SimpleNamespace(path=path)
        self.method = method


def configure(monkeypatch, payload):
    monkeypatch.setenv("SUPABASE_URL", "https://example.supabase.co")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "server-only-test-key")
    monkeypatch.setattr(auth, "urlopen", lambda *_args, **_kwargs: FakeResponse(payload))


def test_required_permission_maps_existing_protected_surfaces():
    assert auth.required_permission_for_request(FakeRequest("/v1/cases")) == "cases.manage"
    assert auth.required_permission_for_request(FakeRequest("/v1/cases/case-1/sources")) == "cases.manage"
    assert auth.required_permission_for_request(FakeRequest("/v1/diagnostics/errors")) == "diagnostics.read"
    assert auth.required_permission_for_request(FakeRequest("/v1/developer/render/status")) == "diagnostics.read"
    assert auth.required_permission_for_request(FakeRequest("/v1/developer/render/debug-bundle")) == "diagnostics.read"
    assert auth.required_permission_for_request(FakeRequest("/v1/developer/render/deploy", "POST")) == "deploy.manage"
    assert auth.required_permission_for_request(FakeRequest("/v1/protected")) == "developer.console"


def test_require_developer_accepts_trusted_developer_with_console_permission(monkeypatch):
    configure(
        monkeypatch,
        {
            "id": "dev-1",
            "app_metadata": {
                "voxvector_role": "developer",
                "voxvector_permissions": ["developer.console"],
            },
        },
    )
    user = auth.require_developer(FakeRequest(), "Bearer token")
    assert user["id"] == "dev-1"


def test_require_developer_accepts_trusted_admin_case_permission(monkeypatch):
    permissions = [
        "developer.console",
        "users.manage",
        "cases.manage",
        "deploy.manage",
        "diagnostics.read",
    ]
    configure(
        monkeypatch,
        {
            "id": "admin-1",
            "app_metadata": {
                "role": "admin",
                "voxvector_permissions": permissions,
            },
        },
    )
    user = auth.require_developer(FakeRequest("/v1/cases/case-1"), "Bearer token")
    assert user["id"] == "admin-1"
    assert user["app_metadata"]["voxvector_permissions"] == permissions


def test_case_route_rejects_operator_without_cases_manage(monkeypatch):
    configure(
        monkeypatch,
        {
            "id": "dev-2",
            "app_metadata": {
                "voxvector_role": "developer",
                "voxvector_permissions": ["developer.console", "diagnostics.read"],
            },
        },
    )
    with pytest.raises(HTTPException) as exc:
        auth.require_developer(FakeRequest("/v1/cases"), "Bearer token")
    assert exc.value.status_code == 403
    assert "cases.manage" in str(exc.value.detail)


def test_diagnostics_route_rejects_operator_without_diagnostics_read(monkeypatch):
    configure(
        monkeypatch,
        {
            "id": "dev-3",
            "app_metadata": {
                "voxvector_role": "developer",
                "voxvector_permissions": ["developer.console", "cases.manage"],
            },
        },
    )
    with pytest.raises(HTTPException) as exc:
        auth.require_developer(FakeRequest("/v1/diagnostics/events"), "Bearer token")
    assert exc.value.status_code == 403
    assert "diagnostics.read" in str(exc.value.detail)


def test_render_deploy_requires_deploy_manage_not_diagnostics_read(monkeypatch):
    configure(
        monkeypatch,
        {
            "id": "dev-4",
            "app_metadata": {
                "voxvector_role": "developer",
                "voxvector_permissions": ["developer.console", "diagnostics.read"],
            },
        },
    )
    with pytest.raises(HTTPException) as exc:
        auth.require_developer(FakeRequest("/v1/developer/render/deploy", "POST"), "Bearer token")
    assert exc.value.status_code == 403
    assert "deploy.manage" in str(exc.value.detail)


def test_missing_permission_metadata_does_not_fall_back_to_role_defaults(monkeypatch):
    configure(monkeypatch, {"id": "dev-5", "app_metadata": {"voxvector_role": "developer"}})
    with pytest.raises(HTTPException) as exc:
        auth.require_developer(FakeRequest(), "Bearer token")
    assert exc.value.status_code == 403
    assert "developer.console" in str(exc.value.detail)


def test_role_incompatible_permission_does_not_grant_access(monkeypatch):
    configure(
        monkeypatch,
        {
            "id": "dev-6",
            "app_metadata": {
                "voxvector_role": "developer",
                "voxvector_permissions": ["users.manage"],
            },
        },
    )
    with pytest.raises(HTTPException) as exc:
        auth.require_developer(FakeRequest(), "Bearer token")
    assert exc.value.status_code == 403


def test_require_developer_rejects_approved_user_role_even_with_operator_permission(monkeypatch):
    configure(
        monkeypatch,
        {
            "id": "user-1",
            "app_metadata": {
                "voxvector_role": "user",
                "voxvector_permissions": ["developer.console", "user.workspace"],
            },
        },
    )
    with pytest.raises(HTTPException) as exc:
        auth.require_developer(FakeRequest(), "Bearer token")
    assert exc.value.status_code == 403


def test_require_developer_ignores_user_editable_role_and_permissions(monkeypatch):
    configure(
        monkeypatch,
        {
            "id": "user-2",
            "app_metadata": {},
            "user_metadata": {
                "role": "admin",
                "voxvector_permissions": ["developer.console", "cases.manage"],
            },
        },
    )
    with pytest.raises(HTTPException) as exc:
        auth.require_developer(FakeRequest(), "Bearer token")
    assert exc.value.status_code == 403


def test_require_developer_requires_bearer_token():
    with pytest.raises(HTTPException) as exc:
        auth.require_developer(FakeRequest(), None)
    assert exc.value.status_code == 401
