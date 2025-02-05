from datetime import datetime
from enum import Enum
from typing import List
from . import UserRole
from DatabaseConfig import db
 


class Role(db.Model):
    __tablename__ = "Role"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String( 255), nullable=False, unique=True)
    description = db.Column(db.String( 255))

    # TODO: Adding relationships

    @classmethod
    def find_by_id(cls, _id) -> "Role":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Role"]:
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
    
    def get_description(self):
        return self.description

    def set_description(self, description):
        self.description = description
