
import os
from datetime import timedelta
import tempfile


BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class BaseConfig:
    # Flask 
    ENV = 'development'
    FLASK_ENV = 'development'
    SECRET_KEY = 'ad3a330fd4e419ed2714c803048cf7592fe455bd4d62bbb40d0ce125a1ed06ed7f463c22517fa1241dcc4684c3b3c2605b12'
    SESSION_KEY_PREFIX = 'pyhipster:'
    SESSION_TYPE = 'filesystem'
    SESSION_USE_SIGNER = True

    # Database
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost:3306/school'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PROPAGATE_EXCEPTIONS = False
    SQLALCHEMY_EXPIRE_ON_COMMIT = False

    # Mail Configurations
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'my-email-id@gmail.com'
    MAIL_PASSWORD = 'my-email-password'

    # Cache Configurations
    
class ProdConfig:
    # Flask 
    ENV = 'production'
    FLASK_ENV = 'production'
    SECRET_KEY = 'ad3a330fd4e419ed2714c803048cf7592fe455bd4d62bbb40d0ce125a1ed06ed7f463c22517fa1241dcc4684c3b3c2605b12'

    # Database
    # SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://<user>:<password>@<host>[:<port>]/<dbname>'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PROPAGATE_EXCEPTIONS = False
    SQLALCHEMY_EXPIRE_ON_COMMIT = False

    # Mail Configurations
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'my-email-id@gmail.com'
    MAIL_PASSWORD = 'my-email-password'

    # Cache Configurations
