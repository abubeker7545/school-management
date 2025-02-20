def test_session_controller(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/authenticate' endpoint is requested (POST)
    THEN check the response is valid and the required cookies are set
    """

    response = test_client.post('/api/authentication', data=dict(username='admin', password='admin', rememberMe=False))
    assert response.status_code == 200
    assert 'Content-Type' in response.headers
    cookies = response.headers.getlist('Set-Cookie')
    cookie = next((cookie for cookie in cookies if "JSESSIONID" in cookie), None)
    assert cookie is not None
    cookie = next((cookie for cookie in cookies if "X-XSRF-TOKEN" in cookie), None)
    assert cookie is not None
