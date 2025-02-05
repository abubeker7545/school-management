import pytest
from AlimranStudentManagmentApp import create_app
from flask import Flask
from config.FakeDataLoader import load_fake_data
from DatabaseConfig import db
from flask_login import FlaskLoginClient, LoginManager
from domain.User import User


@pytest.fixture(scope='session')
def test_client():
    app = Flask(__name__)
    login_manager = LoginManager()
    flask_app = create_app(app)
    flask_app.test_client_class = FlaskLoginClient
    flask_app.app_context().push()
    flask_app.config['TESTING'] = True
    flask_app.config['LOGIN_DISABLED'] = True
    user = User()
    user.set_login('admin')

    with flask_app.test_client(user = user) as testing_client:
      login_manager.init_app(flask_app)
      db.create_all()
      load_fake_data(flask_app)
      testing_client.post('/api/authentication', data=dict(username='admin', password='admin', rememberMe=False))
      yield testing_client
