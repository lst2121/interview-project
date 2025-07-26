from behave import then

@then('the response should contain "{key}"')
def step_response_contains_key(context, key):
    # Check both root and parsedBody (for GET and POST flexibility)
    body = context.response_json
    found = key in body or ('parsedBody' in body and key in body['parsedBody'])

    assert found, f"'{key}' not found in response: {body}"
