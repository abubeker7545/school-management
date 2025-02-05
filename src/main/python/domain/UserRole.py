from datetime import datetime
from enum import Enum
from typing import List
from . import Person
from . import Role
from DatabaseConfig import db
 

user_role_person = db.Table('user_role_person',
    db.Column('user role_id', db.Integer, db.ForeignKey('UserRole.id'), primary_key=True),
    db.Column('person_id', db.Integer, db.ForeignKey('Person.id'), primary_key=True)
)
user_role_role = db.Table('user_role_role',
    db.Column('user role_id', db.Integer, db.ForeignKey('UserRole.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('Role.id'), primary_key=True)
)

class UserRole(db.Model):
    __tablename__ = "UserRole"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    assigned_date = db.Column(db.String( 255))

    # TODO: Adding relationships
    people = db.relationship("Person", secondary=user_role_person, lazy="subquery")
    roles = db.relationship("Role", secondary=user_role_role, lazy="subquery")

    @classmethod
    def find_by_id(cls, _id) -> "UserRole":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["UserRole"]:
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
    
    def get_assigned_date(self):
        return self.assigned_date

    def set_assigned_date(self, assigned_date):
        self.assigned_date = assigned_date
