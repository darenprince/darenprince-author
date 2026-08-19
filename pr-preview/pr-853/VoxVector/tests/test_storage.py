import pytest

from api.storage import StorageConfig, StorageError, SupabaseStorage


class FakeStorage(SupabaseStorage):
    def __init__(self):
        super().__init__(StorageConfig(supabase_url="https://example.supabase.co", service_role_key="test-key"))
        self.requests = []
        self._bucket_ready = True

    def _request(self, method, url, body=None, content_type=None):
        self.requests.append((method, url, body, content_type))
        if method == "POST":
            return 200, b"{}"
        return 200, b'{"ok":true}'


def test_storage_rejects_path_traversal():
    storage = FakeStorage()
    with pytest.raises(ValueError):
        storage.put_json("events/../secret.json", {"x": 1})
    assert storage.requests == []


def test_storage_uploads_json_to_private_bucket():
    storage = FakeStorage()
    result = storage.put_json("events/2026/08/19/request/event.json", {"event": "request.started"})

    assert result == "voxvector-logs/events/2026/08/19/request/event.json"
    assert len(storage.requests) == 1
    method, url, body, content_type = storage.requests[0]
    assert method == "POST"
    assert "/storage/v1/object/voxvector-logs/" in url
    assert body == b'{"event":"request.started"}'
    assert content_type == "application/json"


def test_storage_get_json_decodes_payload():
    storage = FakeStorage()
    assert storage.get_json("events/test.json") == {"ok": True}


def test_storage_requires_configuration():
    storage = SupabaseStorage(StorageConfig())
    assert storage.status() == "not_configured"
    with pytest.raises(StorageError):
        storage.put_json("events/test.json", {"x": 1})
