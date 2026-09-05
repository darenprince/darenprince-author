from __future__ import annotations

from api.case_store import CaseNotFound, CaseStore
from api.storage import StorageError


class FakeStorage:
    def __init__(self):
        self.json = {}
        self.media = {}

    def put_json(self, path, payload):
        self.json[path] = payload
        return f"voxvector-logs/{path}"

    def get_json(self, path):
        if path not in self.json:
            raise StorageError("missing")
        return self.json[path]

    def list_json(self, prefix, limit=100, offset=0):
        prefix = prefix.rstrip("/") + "/"
        names = sorted(path[len(prefix):] for path in self.json if path.startswith(prefix))
        return [{"name": name} for name in names[:limit]]

    def put_bytes(self, path, body, content_type="application/octet-stream"):
        self.media[path] = body
        return f"voxvector-media/{path}"


def test_case_creation_and_source_persistence():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Interview case")

    source = store.add_source(
        "user-1",
        case["case_id"],
        "sample.wav",
        b"RIFF sample",
        {"sample_rate": 48000, "duration_seconds": 2.0},
    )

    loaded = store.get_case("user-1", case["case_id"])
    assert loaded["status"] == "source_ready"
    assert loaded["sources"][0]["source_id"] == source["source_id"]
    assert source["sha256"]
    assert source["media_path"].startswith("media/user-1/")
    assert source["media_path"] in storage.media


def test_case_ownership_is_enforced():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1")

    try:
        store.get_case("user-2", case["case_id"])
    except CaseNotFound:
        return
    raise AssertionError("cross-user case access must be rejected")


def test_case_list_returns_owner_cases_sorted_by_updated_at():
    storage = FakeStorage()
    store = CaseStore(storage)
    first = store.create_case("user-1", "First")
    second = store.create_case("user-1", "Second")
    other = store.create_case("user-2", "Other")

    storage.json[f"cases/user-1/{first['case_id']}.json"]["updated_at"] = "2026-09-05T00:00:00+00:00"
    storage.json[f"cases/user-1/{second['case_id']}.json"]["updated_at"] = "2026-09-05T01:00:00+00:00"

    cases = store.list_cases("user-1", limit=50)

    assert [item["case_id"] for item in cases] == [second["case_id"], first["case_id"]]
    assert other["case_id"] not in {item["case_id"] for item in cases}
