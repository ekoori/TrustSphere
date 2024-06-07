# File: ./backend/app/tests/test_trusttrail_api.py

import requests
import pytest

BASE_URL = "143.42.34.42:5000/api"  # Change to your API base URL

@pytest.fixture(scope="module")
def setup_database():
    """Clone the database before running tests"""
    clone_database('production_db', 'test_db')  # Use your actual database names
    yield
    # (Optional) cleanup after tests

def test_add_transaction(setup_database):
    '''Test adding a transaction via API'''
    url = f"{BASE_URL}/trusttrail/transaction"
    data = {
        "user_id": "test_user_id",
        "other_user_id": "test_other_user_id",
        "project_id": "test_project_id"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 201

def test_get_trusttrail(setup_database):
    '''Test retrieving a trusttrail via API'''
    user_id = "test_user_id"
    url = f"{BASE_URL}/trusttrail/{user_id}"
    response = requests.get(url)
    assert response.status_code == 200
    assert "transactions" in response.json()

def test_add_gratitude_comment(setup_database):
    '''Test adding gratitude comment via API'''
    url = f"{BASE_URL}/trusttrail/gratitude"
    data = {
        "transaction_id": "test_transaction_id",
        "comment": "Thank you!"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 201

def test_add_user_comment(setup_database):
    '''Test adding user comment via API'''
    url = f"{BASE_URL}/trusttrail/user_comment"
    data = {
        "transaction_id": "test_transaction_id",
        "user_comment": "Great cooperation!"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 201

def test_add_other_comment(setup_database):
    '''Test adding other user comment via API'''
    url = f"{BASE_URL}/trusttrail/other_comment"
    data = {
        "transaction_id": "test_transaction_id",
        "other_user_id": "test_other_user_id",
        "comment": "Need more details on this."
    }
    response = requests.post(url, json=data)
    assert response.status_code == 201

def test_set_status(setup_database):
    '''Test setting status via API'''
    url = f"{BASE_URL}/trusttrail/status"
    data = {
        "transaction_id": "test_transaction_id",
        "status": "Completed"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200