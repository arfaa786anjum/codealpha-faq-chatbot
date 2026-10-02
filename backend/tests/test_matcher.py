import pytest
import os
import json
from matcher import FAQMatcher, FALLBACK_MESSAGE

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
def test_data_path(tmp_path):
    d = tmp_path / "faq_data.json"
    d.write_text(json.dumps(TEST_DATA))
    return str(d)

@pytest.fixture
def matcher(test_data_path):
    return FAQMatcher(test_data_path)

def test_exact_match(matcher):
    res = matcher.get_answer("How do I reset my password?")
    assert res["answer"] == "Go to the portal."
    assert res["score"] > 0.9

def test_alternative_phrasing(matcher):
    res = matcher.get_answer("I forgot my password")
    assert res["answer"] == "Go to the portal."
    assert res["score"] > 0.3 # matches alternative

def test_unknown_question(matcher):
    res = matcher.get_answer("What is the cafeteria menu?")
    assert res["answer"] == FALLBACK_MESSAGE
    assert res["score"] < 0.3

def test_empty_input(matcher):
    res = matcher.get_answer("")
    assert res["answer"] == "Please enter a question."
    
    res = matcher.get_answer("   ")
    assert res["answer"] == "Please enter a question."

def test_empty_dataset():
    empty_matcher = FAQMatcher("non_existent_file.json")
    res = empty_matcher.get_answer("How do I reset my password?")
    assert res["answer"] == FALLBACK_MESSAGE
    assert res["score"] == 0.0
