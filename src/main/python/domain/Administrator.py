from datetime import datetime
from enum import Enum
from typing import List
from . import Person
from . import School
from . import AdministrativeBoard
from DatabaseConfig import db
 


class Administrator(db.Model):
    __tablename__ = "Administrator"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String( 255), nullable=False)
    email = db.Column(db.String( 255), nullable=False, unique=True)

    # TODO: Adding relationships
    person_id = db.Column(db.Integer, db.ForeignKey("Person.id"))
    person = db.relationship("Person", lazy="subquery", primaryjoin="Administrator.person_id == Person.id")
    school_id = db.Column(db.Integer, db.ForeignKey("School.id"))    
    school = db.relationship("School", lazy="subquery", primaryjoin="Administrator.school_id == School.id")

    @classmethod
    def find_by_id(cls, _id) -> "Administrator":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Administrator"]:
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
    
    def get_email(self):
        return self.email

    def set_email(self, email):
        self.email = email
