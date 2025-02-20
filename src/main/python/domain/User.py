from typing import List
from DatabaseConfig import db
from flask_login import UserMixin

jhi_user_authority = db.Table('jhi_user_authority',
    db.Column('user_id', db.Integer, db.ForeignKey('jhi_user.id'), primary_key=True),
    db.Column('authority_name', db.String(80), db.ForeignKey('jhi_authority.name'), primary_key=True)
)


class User(UserMixin,db.Model):
    __tablename__ = "jhi_user"
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(60))
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(191), unique=True, nullable=False)
    activated = db.Column(db.Boolean, nullable=False, default=False)
    lang_key = db.Column(db.String(10), nullable=False, default='en')
    image_url = db.Column(db.String(256))
    activation_key = db.Column(db.String(20))
    reset_key = db.Column(db.String(20))
    created_by = db.Column(db.String(50))
    created_date = db.Column(db.DateTime)
    reset_date = db.Column(db.DateTime)
    last_modified_by = db.Column(db.String(50))
    last_modified_date = db.Column(db.DateTime)

    roles = db.relationship('Authority', secondary='jhi_user_authority', lazy='joined')

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            self.key = value

    def set_id(self, _id):
        self.id = _id

    def get_id(self):
        return self.id

    def set_login(self, _login):
        self.login = _login

    def get_login(self):
        return self.login

    def set_password(self, _password):
        self.password_hash = _password

    def get_password(self):
        return self.password_hash

    def set_first_name(self, _firstName):
        self.first_name = _firstName

    def get_first_name(self):
        return self.firstName

    def set_last_name(self, _lastName):
        self.last_name = _lastName

    def get_last_name(self):
        return self.last_name

    def set_email(self, _email):
        self.email = _email

    def get_email(self):
        return self.email

    def set_activated(self, _activated):
        self.activated = _activated

    def get_activated(self):
        return self.activated

    def set_lang_key(self, _langKey):
        self.lang_key = _langKey

    def get_lang_key(self):
        return self.lang_key

    def set_image_url(self, _imageUrl):
        self.image_url = _imageUrl

    def get_image_url(self):
        return self.image_url

    def set_activation_key(self, _activation_key):
        self.activation_key = _activation_key

    def get_activation_key(self):
        return self.activation_key

    def set_reset_key(self, _reset_key):
        self.reset_key = _reset_key

    def get_reset_key(self):
        return self.reset_key

    def set_reset_date(self, _resetDate):
        self.reset_date = _resetDate

    def get_reset_date(self):
        return self.reset_date

    def set_created_by(self, _createdBy):
        self.created_by = _createdBy

    def get_created_by(self):
        return self.created_by

    def set_created_date(self, _createdDate):
        self.created_date = _createdDate

    def get_created_date(self):
        return self.created_date

    def set_last_modified_by(self, _lastModifiedBy):
        self.last_modified_by = _lastModifiedBy

    def get_last_modified_by(self):
        return self.last_modified_by

    def set_last_modified_date(self, _lastModifiedDate):
        self.last_modified_date = _lastModifiedDate

    def get_last_modified_date(self):
        return self.last_modified_date

    def __repr__(self):
        return '<User %r>' % self.login

    @classmethod
    def get_by_id(cls, id) -> "User":
        user = cls.query.filter_by(id=id).first()
        if user is not None:
            return user
        return None

    @classmethod
    def get_by_email(cls, email) -> "User":
        user = cls.query.filter_by(email=email).first()
        if user is not None:
            return user
        return None

    @classmethod
    def get_by_activation_key(cls, activation_key) -> "User":
        user = cls.query.filter_by(activation_key=activation_key).first()
        if user is not None:
            return user
        return None

    @classmethod
    def get_by_reset_key(cls, reset_key) -> "User":
        user = cls.query.filter_by(reset_key=reset_key).first()
        if user is not None:
            return user
        return None

    @classmethod
    def get_by_login(cls, login) -> "User":
        user = cls.query.filter_by(login=login).first()
        if user is not None:
            return user
        return None

    @classmethod
    def get_all_users(cls) -> List["User"]:
        user_list = cls.query.all()
        return user_list

    @classmethod
    def get_roles_by_login(cls, login) -> "User":
        user = cls.query.filter_by(login=login).first()
        return User.query.join(jhi_user_authority).filter(jhi_user_authority.c.user_id == user.id).all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        