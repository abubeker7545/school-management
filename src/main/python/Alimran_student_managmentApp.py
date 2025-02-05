
from flask import Flask, Blueprint
from flask_restx import Api
from flask import session
from flask_login import LoginManager
from domain.User import User
from rest import add_api_namespace
from config.BaseConfig import BaseConfig
from config.FakeDataLoader import load_fake_data
from DatabaseConfig import db
from WebSerializer import ma
from MailConfiguration import mail


app = Flask(__name__, template_folder='../resources/templates/mail')
bluePrint = Blueprint('api', __name__, url_prefix='/api')
api = Api(bluePrint, doc='/v3/api-docs/default', title='AlimranStudentManagmentApp Application')


api = add_api_namespace(api)
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.get_by_id(int(user_id))

@app.before_first_request
def create_tables():
    db.create_all()
    load_fake_data(app)


def create_app(flaskapp):
    flaskapp.register_blueprint(bluePrint)
    flaskapp.config.from_object(BaseConfig)
    db.init_app(flaskapp)
    ma.init_app(flaskapp)
    login_manager.init_app(app)
    mail.init_app(flaskapp)
    return flaskapp


if __name__ == '__main__':
    flask_app = create_app(app)
    flask_app.run(debug=True, port=8080)
