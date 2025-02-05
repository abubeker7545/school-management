from datetime import datetime
from enum import Enum
from typing import List
from . import Branch
from . import Administrator
from . import Teacher
from . import Student
from DatabaseConfig import db
 


class School(db.Model):
    __tablename__ = "School"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String( 255), nullable=False, unique=True)
    address = db.Column(db.String(200))
    established_date = db.Column(db.String( 255))
    contact_email = db.Column(db.String( 255))

    # TODO: Adding relationships
    branches = db.relationship("Branch", lazy="subquery", viewonly=True)
    administrators = db.relationship("Administrator", lazy="subquery", viewonly=True)
    teachers = db.relationship("Teacher", lazy="subquery", viewonly=True)
    students = db.relationship("Student", lazy="subquery", viewonly=True)

    @classmethod
    def find_by_id(cls, _id) -> "School":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["School"]:
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
    
    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name
    
    def get_address(self):
        return self.address

    def set_address(self, address):
        self.address = address
    
    def get_established_date(self):
        return self.established_date

    def set_established_date(self, established_date):
        self.established_date = established_date
    
    def get_contact_email(self):
        return self.contact_email

    def set_contact_email(self, contact_email):
        self.contact_email = contact_email
