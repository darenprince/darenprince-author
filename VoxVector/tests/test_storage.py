import pytest

from api.storage import StorageConfig, StorageError, SupabaseStorage


class FakeStorage(SupabaseStorage):
    def __init__(self, config=None):
        super().__init__(config or StorageConfig(supabase_url="https://example.supabase.co", service_role_key="test-key"))
        self.requests = []
        self._bucket_ready = True
        self._media_bucket_ready = True

    def _request(self, method, url, body=None, content_type=None, *, retries=0, require_log_config=False, extra_headers=None):
        self.requests.append((method, url, body, content_type, retries, require_log_config, extra_headers or {}))
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
    method, url, body, content_type, retries, require_log_config, extra_headers = storage.requests[0]
    assert method == "POST"
    assert "/storage/v1/object/voxvector-logs/" in url
    assert body == b'{"event":"request.started"}'
    assert content_type == "application/json"
    assert retries == 2
    assert require_log_config is True
    assert extra_headers.get("x-upsert") == "true"


def test_storage_get_json_decodes_payload():
    storage = FakeStorage()
    assert storage.get_json("events/test.json") == {"ok": True}


def test_storage_put_bytes_uses_private_media_bucket():
    storage = FakeStorage()
    result = storage.put_bytes("media/case-a/source-a.wav", b"RIFF-WAV", "audio/wav")
    assert result == "voxvector-media/media/case-a/source-a.wav"
    method, url, body, content_type, retries, require_log_config, extra_headers = storage.requests[0]
    assert method == "POST"
    assert "/storage/v1/object/voxvector-media/" in url
    assert body == b"RIFF-WAV"
    assert content_type == "audio/wav"
    assert retries == 2
    assert require_log_config is False
    assert extra_headers == {}


def test_media_upload_does_not_require_log_bucket_configuration():
    config = StorageConfig(supabase_url="https://example.supabase.co", service_role_key="test-key", bucket="", media_bucket="voxvector-media")
    storage = FakeStorage(config)
    assert storage.config.configured is False
    assert storage.media_configured is True
    result = storage.put_bytes("media/case-a/source-a.wav", b"RIFF-WAV", "audio/wav")
    assert result == "voxvector-media/media/case-a/source-a.wav"
    assert storage.requests
    assert storage.requests[0][5] is False


def test_storage_rejects_empty_media():
    storage = FakeStorage()
    with pytest.raises(StorageError, match="empty"):
        storage.put_bytes("media/case-a/source-a.wav", b"", "audio/wav")
    assert storage.requests == []


def test_storage_requires_configuration():
    storage = SupabaseStorage(StorageConfig())
    assert storage.status() == "not_configured"
    with pytest.raises(StorageError):
        storage.put_json("events/test.json", {"x": 1})
