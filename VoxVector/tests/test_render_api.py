import asyncio
from types import SimpleNamespace
from urllib.parse import parse_qs, urlparse

from fastapi import HTTPException

from api.render_api import _is_suspended, _normalize_log, _owner_id, _reported_suspension_state, _rows, _trigger_deploy_hook, _unwrap_rows
from api.storage import StorageError


def test_owner_id_accepts_render_casing_and_nested_owner():
    assert _owner_id({"ownerId": "own-1"}) == "own-1"
    assert _owner_id({"owner": {"id": "own-2"}}) == "own-2"
    assert _owner_id({}) is None


def test_rows_normalizes_common_render_envelopes():
    assert _rows([{"id": "1"}]) == [{"id": "1"}]
    assert _rows({"items": [{"id": "2"}]}) == [{"id": "2"}]
    assert _rows({"deploys": [{"id": "3"}]}) == [{"id": "3"}]


def test_unwrap_rows_normalizes_render_resource_wrappers():
    payload = [
        {"deploy": {"id": "dep-1", "status": "live"}, "cursor": "abc"},
        {"deploy": {"id": "dep-2", "status": "deactivated"}, "cursor": "def"},
    ]
    assert _unwrap_rows(payload, "deploy") == [
        {"id": "dep-1", "status": "live"},
        {"id": "dep-2", "status": "deactivated"},
    ]
    assert _unwrap_rows([{"id": "plain"}], "deploy") == [{"id": "plain"}]


def test_render_suspended_state_handles_render_string_values():
    assert _is_suspended(True) is True
    assert _is_suspended("suspended") is True
    assert _is_suspended("not_suspended") is False
    assert _is_suspended(False) is False
    assert _is_suspended(None) is False


def test_render_suspension_state_requires_reported_evidence():
    assert _reported_suspension_state(True) == "suspended"
    assert _reported_suspension_state("suspended") == "suspended"
    assert _reported_suspension_state(False) == "active"
    assert _reported_suspension_state("not_suspended") == "active"
    assert _reported_suspension_state(None) is None
    assert _reported_suspension_state("provider_unknown") is None


def test_render_status_normalizes_live_service_and_latest_deploy(monkeypatch):
    import api.render_api as render_api

    service = {
        "id": "srv-test",
        "name": "voxvector-api",
        "type": "web_service",
        "ownerId": "owner-test",
        "suspended": "not_suspended",
        "serviceDetails": {"url": "https://voxvector-api.onrender.com", "region": "oregon"},
    }
    deploys = [
        {
            "deploy": {
                "id": "dep-live",
                "status": "live",
                "createdAt": "2026-09-05T18:10:17Z",
                "finishedAt": "2026-09-05T18:17:05Z",
                "commit": {"id": "abc123"},
            },
            "cursor": "cursor-1",
        }
    ]
    instances = [{"instance": {"id": "instance-1"}, "cursor": "cursor-2"}]

    monkeypatch.setattr(render_api, "_config", lambda service_id=None: ("key", service_id or "srv-test"))

    def fake_get(path, api_key, params=None):
        if path == "/services/srv-test":
            return service
        if path.endswith("/deploys"):
            return deploys
        if path.endswith("/instances"):
            return instances
        raise AssertionError(path)

    monkeypatch.setattr(render_api, "_render_get", fake_get)
    result = render_api.render_status(service_id="srv-test", log_minutes=30, _={})

    assert result["service"]["suspended"] is False
    assert result["service"]["state"] == "active"
    assert result["service"]["url"] == "https://voxvector-api.onrender.com"
    assert result["latest_deploy"]["id"] == "dep-live"
    assert result["latest_deploy"]["status"] == "live"
    assert result["instances"] == [{"id": "instance-1"}]
    assert result["operational"] == {
        "source": "Render API",
        "observed_at": result["observed_at"],
        "service_state": "active",
        "deploy_state": "live",
        "source_revision": "abc123",
    }


def test_render_status_reports_unknown_revision_without_coercing_missing_commit(monkeypatch):
    import api.render_api as render_api

    monkeypatch.setattr(render_api, "_config", lambda service_id=None: ("key", "srv-test"))

    def fake_get(path, api_key, params=None):
        if path == "/services/srv-test":
            return {"id": "srv-test"}
        if path.endswith("/deploys") or path.endswith("/instances"):
            return []
        raise AssertionError(path)

    monkeypatch.setattr(render_api, "_render_get", fake_get)
    result = render_api.render_status(service_id="srv-test", _={})

    assert result["service"]["suspended"] is False
    assert result["operational"]["service_state"] == "not_reported"
    assert result["operational"]["deploy_state"] == "not_reported"
    assert result["operational"]["source_revision"] == "unknown"


def test_render_log_query_uses_service_resource_and_owner_id():
    query = parse_qs(urlparse("https://api.render.com/v1/logs?ownerId=owner&resource=service&type=app&type=request").query)
    assert query["ownerId"] == ["owner"]
    assert query["resource"] == ["service"]
    assert query["type"] == ["app", "request"]


def test_normalize_log_exposes_only_consumer_fields():
    normalized = _normalize_log(
        {
            "timestamp": "2026-09-10T20:00:00Z",
            "level": "info",
            "type": "app",
            "message": "provider line",
            "requestId": "provider-internal-request",
            "metadata": {"private": "provider payload"},
        }
    )

    assert normalized == {
        "message": "provider line",
        "timestamp": "2026-09-10T20:00:00Z",
        "level": "info",
        "type": "app",
    }
    assert "raw" not in normalized


def test_debug_bundle_route_marks_unavailable_queries_separately_from_empty_results(monkeypatch):
    import api.app as app
    import api.render_api as render_api

    case = {
        "case_id": "case-1",
        "runs": [
            {
                "run_id": "run-1",
                "request_id": "req-1",
                "started_at": "2026-09-10T20:00:00+00:00",
                "completed_at": "2026-09-10T20:00:05+00:00",
            }
        ],
    }
    monkeypatch.setattr(app, "CASE_STORE", SimpleNamespace(get_case=lambda owner_id, case_id: case))

    async def fake_health():
        return {"status": "ok"}

    monkeypatch.setattr(app, "health", fake_health)

    class FakeDiagnostics:
        storage = object()

        async def emit(self, *args, **kwargs):
            return None

    monkeypatch.setattr(render_api, "DIAGNOSTICS", FakeDiagnostics())

    def unavailable_events(*args, **kwargs):
        raise StorageError("diagnostic projection unavailable")

    monkeypatch.setattr(render_api, "correlated_event_rows", unavailable_events)
    monkeypatch.setattr(render_api, "correlated_error_rows", lambda *args, **kwargs: [])

    def unavailable_render(*args, **kwargs):
        raise HTTPException(status_code=503, detail="Render bridge unavailable")

    monkeypatch.setattr(render_api, "_config", unavailable_render)

    captured = {}

    def fake_build_debug_zip(**kwargs):
        captured.update(kwargs["correlation_counts"])
        return b"zip", {"missing_evidence": ["supabase_voxvector_events", "render_provider_logs"]}

    monkeypatch.setattr(render_api, "build_debug_zip", fake_build_debug_zip)

    response = asyncio.run(
        render_api.render_debug_bundle(
            case_id="case-1",
            run_id="run-1",
            user={"id": "user-1"},
        )
    )

    assert response.body == b"zip"
    assert captured["events_available"] == 0
    assert captured["errors_available"] == 1
    assert captured["render_logs_available"] == 0


def test_deploy_hook_posts_without_exposing_hook_value(monkeypatch):
    import api.render_api as render_api

    seen = {}

    class Response:
        status = 200
        def read(self):
            return b'{"id":"dep-test"}'
        def __enter__(self):
            return self
        def __exit__(self, *args):
            return False

    def fake_open(request, timeout):
        seen["method"] = request.get_method()
        seen["url"] = request.full_url
        seen["timeout"] = timeout
        return Response()

    monkeypatch.setenv("RENDER_DEPLOY_HOOK_URL", "https://example.invalid/hook/secret")
    monkeypatch.setattr(render_api, "urlopen", fake_open)
    result = _trigger_deploy_hook()
    assert seen["method"] == "POST"
    assert seen["url"] == "https://example.invalid/hook/secret"
    assert result["response_status"] == 200
    assert result["response_body_format"] == "json"


def test_deploy_hook_accepts_successful_non_json_response(monkeypatch):
    import api.render_api as render_api

    class Response:
        status = 200
        def read(self):
            return b"Deploy request accepted"
        def __enter__(self):
            return self
        def __exit__(self, *args):
            return False

    monkeypatch.setenv("RENDER_DEPLOY_HOOK_URL", "https://example.invalid/hook/secret")
    monkeypatch.setattr(render_api, "urlopen", lambda request, timeout: Response())

    result = _trigger_deploy_hook()

    assert result["response_status"] == 200
    assert result["response_body_format"] == "text"
    assert result["payload"] == {}


def test_deploy_hook_accepts_successful_empty_response(monkeypatch):
    import api.render_api as render_api

    class Response:
        status = 202
        def read(self):
            return b""
        def __enter__(self):
            return self
        def __exit__(self, *args):
            return False

    monkeypatch.setenv("RENDER_DEPLOY_HOOK_URL", "https://example.invalid/hook/secret")
    monkeypatch.setattr(render_api, "urlopen", lambda request, timeout: Response())

    result = _trigger_deploy_hook()

    assert result["response_status"] == 202
    assert result["response_body_format"] == "empty"
    assert result["payload"] == {}
