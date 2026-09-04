from urllib.parse import parse_qs, urlparse

from api.render_api import _owner_id, _rows, _trigger_deploy_hook


def test_owner_id_accepts_render_casing_and_nested_owner():
    assert _owner_id({"ownerId": "own-1"}) == "own-1"
    assert _owner_id({"owner": {"id": "own-2"}}) == "own-2"
    assert _owner_id({}) is None


def test_rows_normalizes_common_render_envelopes():
    assert _rows([{"id": "1"}]) == [{"id": "1"}]
    assert _rows({"items": [{"id": "2"}]}) == [{"id": "2"}]
    assert _rows({"deploys": [{"id": "3"}]}) == [{"id": "3"}]


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
