from datetime import datetime
from enum import Enum
from typing import List
from DatabaseConfig import db
 


class RoleAssignment(db.Model):
    __tablename__ = "RoleAssignment"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_type = db.Column(db.String( 255), nullable=False)
    effective_date = db.Column(db.String( 255), nullable=False)
    expiration_date = db.Column(db.String( 255))

    # TODO: Adding relationships

    @classmethod
    def find_by_id(cls, _id) -> "RoleAssignment":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["RoleAssignment"]:
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
    
    def get_role_type(self):
        return self.role_type

    def set_role_type(self, role_type):
        self.role_type = role_type
    
    def get_effective_date(self):
        return self.effective_date

    def set_effective_date(self, effective_date):
        self.effective_date = effective_date
    
    def get_expiration_date(self):
        return self.expiration_date

    def set_expiration_date(self, expiration_date):
        self.expiration_date = expiration_date
