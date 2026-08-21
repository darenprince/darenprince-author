from __future__ import annotations


class FakeStorage:
    def __init__(self):
        self.json = {}
        self.media = {}
        self.config = type("Config", (), {"media_bucket": "voxvector-media"})()

    def put_json(self, path, payload):
        self.json[path] = payload
        return f"voxvector-logs/{path}"

    def get_json(self, path):
        if path not in self.json:
            raise RuntimeError("missing")
        return self.json[path]

    def list_json(self, prefix, limit=100, offset=0):
        prefix = prefix.rstrip("/") + "/"
        names = sorted(path[len(prefix):] for path in self.json if path.startswith(prefix))
        return [{"name": name} for name in names[:limit]]

    def put_bytes(self, path, body, content_type="application/octet-stream"):
        self.media[path] = body
        return f"voxvector-media/{path}"

from api.case_store import CaseStore, CaseNotFound


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
