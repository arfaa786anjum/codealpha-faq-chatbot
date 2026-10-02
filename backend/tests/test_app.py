import pytest
import os
import json
from app import app
from matcher import FALLBACK_MESSAGE

# Dummy data for testing
TEST_DATA = [
    {
        "id": "1",
        "question": "How do I reset my password?",
        "answer": "Go to the portal.",
        "alternatives": ["forgot password", "password reset"]
    }
]

@pytest.fixture
def client(tmp_path):
    # We will point the app's matcher to a temp dataset for isolation
    # Note: the app initializes matcher at the module level, so we might need to overwrite its data
    from app import matcher
    
    d = tmp_path / "faq_data.json"
    d.write_text(json.dumps(TEST_DATA))
    matcher.load_data(str(d))
    
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_chat_exact(client):
    res = client.post('/api/chat', json={"question": "How do I reset my password?"})
    assert res.status_code == 200
    assert res.json['answer'] == "Go to the portal."

def test_chat_alternative(client):
    res = client.post('/api/chat', json={"question": "I forgot my password"})
    assert res.status_code == 200
    assert res.json['answer'] == "Go to the portal."

def test_chat_unknown(client):
    res = client.post('/api/chat', json={"question": "Where is the cafeteria?"})
    assert res.status_code == 200
    assert res.json['answer'] == FALLBACK_MESSAGE

def test_chat_empty(client):
    res = client.post('/api/chat', json={"question": "   "})
    assert res.status_code == 200
    assert "Please enter a question" in res.json['answer']

def test_chat_malformed_missing_question(client):
    res = client.post('/api/chat', json={"wrong_key": "hello"})
    assert res.status_code == 400
    assert "Invalid request" in res.json['error']

def test_chat_malformed_no_json(client):
    res = client.post('/api/chat', data="not a json")
    assert res.status_code == 400 # wait, get_json() silently handles some things, actually it might return 415 or 400. The code says: data = request.get_json(); if not data... returns 400.
    # Flask might abort with 415 if mimetype is wrong.
