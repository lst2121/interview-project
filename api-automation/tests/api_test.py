import pytest
import requests

def test_get_request():
    url = "https://echo.free.beeceptor.com/sample-request?author=beeceptor"
    response = requests.get(url)
    
    assert response.status_code == 200
    response_data = response.json()
    
    assert "path" in response_data
    assert "ip" in response_data
    assert "headers" in response_data

def test_post_request():
    url = "http://echo.free.beeceptor.com/sample-request?author=beeceptor"
    
    payload = {
        "order_id": "12345",
        "customer": {
            "name": "Jane Smith",
            "email": "janesmith@example.com",
            "phone": "1-987-654-3210",
            "address": {
                "street": "456 Oak Street",
                "city": "Metropolis",
                "state": "NY",
                "zipcode": "10001",
                "country": "USA"
            }
        },
        "items": [
            {
                "product_id": "A101",
                "name": "Wireless Headphones",
                "quantity": 1,
                "price": 79.99
            },
            {
                "product_id": "B202",
                "name": "Smartphone Case",
                "quantity": 2,
                "price": 15.99
            }
        ],
        "payment": {
            "method": "credit_card",
            "transaction_id": "txn_67890",
            "amount": 111.97,
            "currency": "USD"
        },
        "shipping": {
            "method": "standard",
            "cost": 5.99,
            "estimated_delivery": "2024-11-15"
        },
        "order_status": "processing",
        "created_at": "2024-11-07T12:00:00Z"
    }
    
    response = requests.post(url, json=payload)
    
    assert response.status_code == 200
    response_data = response.json()
    
    assert "parsedBody" in response_data
    parsed_body = response_data["parsedBody"]
    
    assert "order_id" in parsed_body
    assert "customer" in parsed_body
    assert "items" in parsed_body
    assert "payment" in parsed_body
    assert "shipping" in parsed_body
    assert "order_status" in parsed_body
    assert "created_at" in parsed_body 