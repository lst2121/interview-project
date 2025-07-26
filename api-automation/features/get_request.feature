Feature: Validate GET Request to Echo API

  Scenario: Validate path, IP and headers in GET response
    Given I send a GET request to "https://echo.free.beeceptor.com/sample-request?author=beeceptor"
    Then the response status code should be 200
    And the response should contain "path"
    And the response should contain "ip"
    And the response should contain "headers"
