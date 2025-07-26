Feature: Validate POST Request to Echo API

  Scenario: Validate customer, payment, and product info in POST response
    Given I send a POST request to "https://echo.free.beeceptor.com/sample-request?author=beeceptor" with order payload
    Then the response status code should be 200
    And the response should contain "order_id"
    And the response should contain "customer"
    And the response should contain "items"
    And the response should contain "payment"
