import requests
from behave import given, then

@given('I send a POST request to "{url}" with order payload')
def step_send_post_request(context, url):
    context.payload = {
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

    response = requests.post(url, json=context.payload)
    context.response = response
    context.response_json = response.json()


@then('the response status code should be {expected_status:d}')
def step_impl_status_code(context, expected_status):
    assert context.response.status_code == expected_status, \
        f"Expected status {expected_status}, got {context.response.status_code}"
