from urllib.parse import parse_qs, urlparse

from voxvector.api.render_api import _owner_id, _rows
from voxvector import api as _api_package  # noqa: F401


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
