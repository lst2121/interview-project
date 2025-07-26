import pytest
import requests

def test_get_request():
    url = "https://echo.free.beeceptor.com/sample-request?author=beeceptor"
    response = requests.get(url)
    
    assert response.status_code == 200
    assert "path" in response.json()
    assert "ip" in response.json()
    assert "headers" in response.json()

def test_post_request():
    url = "https://echo.free.beeceptor.com/sample-request?author=beeceptor"
    
    payload = {
        "order_id": "12345",
        "customer": {
            "name": "Jane Smith",
            "email": "janesmith@example.com"
        },
        "items": [
            {
                "product_id": "A101",
                "name": "Wireless Headphones",
                "quantity": 1,
                "price": 79.99
            }
        ],
        "payment": {
            "method": "credit_card",
            "amount": 79.99
        }
    }
    
    response = requests.post(url, json=payload)
    
    assert response.status_code == 200
    response_data = response.json()
    
    assert "order_id" in response_data
    assert "customer" in response_data
    assert "items" in response_data
    assert "payment" in response_data 