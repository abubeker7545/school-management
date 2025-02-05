from datetime import datetime
from enum import Enum
from typing import List
from . import ClassSession
from DatabaseConfig import db
 


class Classroom(db.Model):
    __tablename__ = "Classroom"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String( 255), nullable=False, unique=True)
    capacity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String( 255))

    # TODO: Adding relationships
    classSessions_id = db.Column(db.Integer, db.ForeignKey("ClassSession.id"))    
    classSessions = db.relationship("ClassSession", lazy="subquery", primaryjoin="Classroom.classSessions_id == ClassSession.id")

    @classmethod
    def find_by_id(cls, _id) -> "Classroom":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Classroom"]:
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
    
    def get_capacity(self):
        return self.capacity

    def set_capacity(self, capacity):
        self.capacity = capacity
    
    def get_location(self):
        return self.location

    def set_location(self, location):
        self.location = location
