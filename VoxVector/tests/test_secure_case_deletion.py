from __future__ import annotations

from copy import deepcopy

from api.case_store import CaseDeletionError, CaseNotFound, CaseStore
from api.storage import StorageError


class DeletionStorage:
    def __init__(self):
        self.json = {}
        self.media = {}
        self.fail_put_prefixes = set()
        self.fail_put_after = {}
        self.put_counts = {}
        self.fail_delete_json_paths = set()
        self.fail_delete_bytes_paths = set()

    def put_json(self, path, payload):
        count = self.put_counts.get(path, 0) + 1
        self.put_counts[path] = count
        if any(path.startswith(prefix) for prefix in self.fail_put_prefixes):
            raise StorageError("put json failed")
        for prefix, allowed_calls in self.fail_put_after.items():
            if path.startswith(prefix) and count > allowed_calls:
                raise StorageError("put json failed after allowed calls")
        self.json[path] = deepcopy(payload)
        return f"voxvector-logs/{path}"

    def get_json(self, path):
        if path not in self.json:
            raise StorageError("missing")
        return deepcopy(self.json[path])

    def list_json(self, prefix, limit=100, offset=0):
        prefix = prefix.rstrip("/") + "/"
        names = sorted(path[len(prefix):] for path in self.json if path.startswith(prefix))
        return [{"name": name} for name in names[offset : offset + limit]]

    def put_bytes(self, path, body, content_type="application/octet-stream"):
        self.media[path] = bytes(body)
        return f"voxvector-media/{path}"

    def delete_json(self, path):
        if path in self.fail_delete_json_paths:
            raise StorageError("delete json failed")
        self.json.pop(path, None)

    def delete_bytes(self, path):
        if path in self.fail_delete_bytes_paths:
            raise StorageError("delete bytes failed")
        self.media.pop(path, None)


def _case_with_source():
    storage = DeletionStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Private title that must not survive")
    source = store.add_source(
        "user-1",
        case["case_id"],
        "private-interview.wav",
        b"RIFF private audio bytes",
        {"sample_rate": 48000, "duration_seconds": 2.0},
    )
    return storage, store, case, source


def _receipt_records(storage):
    return [value for path, value in storage.json.items() if path.startswith("case-deletions/")]


def test_secure_delete_removes_case_and_media_and_persists_sanitized_receipt():
    storage, store, case, source = _case_with_source()

    result = store.delete_case("user-1", case["case_id"])
    receipt = result["deletion_receipt"]

    assert result["case_id"] == case["case_id"]
    assert result["deleted_sources"] == 1
    assert receipt["schema"] == "voxvector.case_deletion_receipt.v1"
    assert receipt["status"] == "completed"
    assert receipt["deletion_id"]
    assert receipt["actor_id"] == "user-1"
    assert receipt["source_count"] == 1
    assert receipt["media_object_count"] == 1
    assert receipt["media_deleted"] == 1
    assert receipt["case_record_deleted"] is True
    assert receipt["failed_boundary"] is None
    assert receipt["source_refs"] == [{"source_id": source["source_id"], "sha256": source["sha256"]}]
    assert f"cases/user-1/{case['case_id']}.json" not in storage.json
    assert source["media_path"] not in storage.media

    persisted = _receipt_records(storage)
    assert len(persisted) == 1
    assert persisted[0]["status"] == "completed"
    text = repr(persisted[0]).lower()
    assert "private title" not in text
    assert "private-interview.wav" not in text
    assert "riff private" not in text
    assert "transcript" not in text
    assert "signed" not in text
    assert "service_role" not in text


def test_secure_delete_rejects_cross_owner_without_audit_record():
    storage, store, case, source = _case_with_source()

    try:
        store.delete_case("user-2", case["case_id"])
    except CaseNotFound:
        pass
    else:
        raise AssertionError("cross-owner deletion must be rejected")

    assert f"cases/user-1/{case['case_id']}.json" in storage.json
    assert source["media_path"] in storage.media
    assert _receipt_records(storage) == []


def test_secure_delete_aborts_before_data_removal_when_audit_cannot_initialize():
    storage, store, case, source = _case_with_source()
    storage.fail_put_prefixes.add("case-deletions/")

    try:
        store.delete_case("user-1", case["case_id"])
    except CaseDeletionError as exc:
        assert exc.receipt["status"] == "audit_initialization_failed"
        assert exc.receipt["failed_boundary"] == "audit_receipt"
    else:
        raise AssertionError("deletion must not start without an audit receipt")

    assert f"cases/user-1/{case['case_id']}.json" in storage.json
    assert source["media_path"] in storage.media


def test_secure_delete_records_media_failure_without_false_completion():
    storage, store, case, source = _case_with_source()
    storage.fail_delete_bytes_paths.add(source["media_path"])

    try:
        store.delete_case("user-1", case["case_id"])
    except CaseDeletionError as exc:
        receipt = exc.receipt
        assert receipt["status"] == "failed"
        assert receipt["failed_boundary"] == "media_object"
        assert receipt["media_deleted"] == 0
        assert receipt["case_record_deleted"] is False
    else:
        raise AssertionError("media failure must not be reported as deletion success")

    assert f"cases/user-1/{case['case_id']}.json" in storage.json
    assert source["media_path"] in storage.media
    assert _receipt_records(storage)[0]["status"] == "failed"


def test_secure_delete_records_case_record_failure_after_media_removal():
    storage, store, case, source = _case_with_source()
    case_path = f"cases/user-1/{case['case_id']}.json"
    storage.fail_delete_json_paths.add(case_path)

    try:
        store.delete_case("user-1", case["case_id"])
    except CaseDeletionError as exc:
        receipt = exc.receipt
        assert receipt["status"] == "failed"
        assert receipt["failed_boundary"] == "case_record"
        assert receipt["media_deleted"] == 1
        assert receipt["case_record_deleted"] is False
    else:
        raise AssertionError("case-record failure must not be reported as deletion success")

    assert case_path in storage.json
    assert source["media_path"] not in storage.media
    assert _receipt_records(storage)[0]["status"] == "failed"


def test_secure_delete_surfaces_final_audit_failure_after_data_deleted():
    storage, store, case, source = _case_with_source()
    storage.fail_put_after["case-deletions/"] = 1

    try:
        store.delete_case("user-1", case["case_id"])
    except CaseDeletionError as exc:
        receipt = exc.receipt
        assert receipt["status"] == "deleted_audit_finalize_failed"
        assert receipt["failed_boundary"] == "audit_receipt_finalize"
        assert receipt["media_deleted"] == 1
        assert receipt["case_record_deleted"] is True
    else:
        raise AssertionError("final audit failure must remain visible")

    assert f"cases/user-1/{case['case_id']}.json" not in storage.json
    assert source["media_path"] not in storage.media
    assert _receipt_records(storage)[0]["status"] == "requested"
