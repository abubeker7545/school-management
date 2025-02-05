from datetime import datetime
from enum import Enum
from typing import List
from . import Payment
from . import Invoice
from . import School
from DatabaseConfig import db
 


class Branch(db.Model):
    __tablename__ = "Branch"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String( 255), nullable=False, unique=True)
    address = db.Column(db.String(200))
    contact_email = db.Column(db.String( 255), nullable=False)
    established_date = db.Column(db.String( 255))
    phone = db.Column(db.String( 255))
    manager = db.Column(db.String( 255))

    # TODO: Adding relationships
    payments = db.relationship("Payment", lazy="subquery", viewonly=True)
    invoices = db.relationship("Invoice", lazy="subquery", viewonly=True)
    school_id = db.Column(db.Integer, db.ForeignKey("School.id"))    
    school = db.relationship("School", lazy="subquery", primaryjoin="Branch.school_id == School.id")

    @classmethod
    def find_by_id(cls, _id) -> "Branch":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Branch"]:
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
    
    def get_contact_email(self):
        return self.contact_email

    def set_contact_email(self, contact_email):
        self.contact_email = contact_email
    
    def get_established_date(self):
        return self.established_date

    def set_established_date(self, established_date):
        self.established_date = established_date
    
    def get_phone(self):
        return self.phone

    def set_phone(self, phone):
        self.phone = phone
    
    def get_manager(self):
        return self.manager

    def set_manager(self, manager):
        self.manager = manager
