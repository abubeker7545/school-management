from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import Teacher
from . import Administrator
from . import UserRole
from DatabaseConfig import db
 


class Person(db.Model):
    __tablename__ = "Person"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String( 255), nullable=False, unique=True)
    email = db.Column(db.String( 255), nullable=False, unique=True)
    password = db.Column(db.String( 255), nullable=False)
    token = db.Column(db.String( 255), unique=True)
    profile_picture = db.Column(db.String( 255))
    bio = db.Column(db.String( 255))

    # TODO: Adding relationships

    @classmethod
    def find_by_id(cls, _id) -> "Person":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Person"]:
        paginate = cls.query.order_by(cls.id).paginate(page=page, per_page=per_page)
        return paginate.items

    @classmethod
    def find_all_count(cls):
        return cls.query.count()
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def update_db(self) -> None:
        db.session.merge(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    # Getters and setters
    def get_id(self):
        return self.id

    def set_id(self, id):
        self.id = id
    
    def get_username(self):
        return self.username

    def set_username(self, username):
        self.username = username
    
    def get_email(self):
        return self.email

    def set_email(self, email):
        self.email = email
    
    def get_password(self):
        return self.password

    def set_password(self, password):
        self.password = password
    
    def get_token(self):
        return self.token

    def set_token(self, token):
        self.token = token
    
    def get_profile_picture(self):
        return self.profile_picture

    def set_profile_picture(self, profile_picture):
        self.profile_picture = profile_picture
    
    def get_bio(self):
        return self.bio

    def set_bio(self, bio):
        self.bio = bio
