from urllib.parse import parse_qs, urlparse

from api.render_api import _is_suspended, _owner_id, _reported_suspension_state, _rows, _trigger_deploy_hook, _unwrap_rows


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
            return {"id": "srv-test", "suspended": "not_suspended"}
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
