from fastapi.testclient import TestClient

from api.app import app

client = TestClient(app)


def test_developer_console_is_served():
    response = client.get("/developer")
    assert response.status_code == 200
    assert "VoxVector Developer Console" in response.text


def test_developer_api_requires_authentication():
    response = client.get("/developer/api/session")
    assert response.status_code == 401
