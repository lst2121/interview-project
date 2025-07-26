import requests
from behave import given, then

@given('I send a GET request to "{url}"')
def step_send_get_request(context, url):
    context.response = requests.get(url)
    context.response_json = context.response.json()

@then('the response status code should be {expected_status:d}')
def step_impl_status_code(context, expected_status):
    assert context.response.status_code == expected_status, \
        f"Expected status {expected_status}, got {context.response.status_code}"

