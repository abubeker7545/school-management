from datetime import datetime
from enum import Enum
from typing import List
from . import Invoice
from . import Branch
from DatabaseConfig import db
 


class Payment(db.Model):
    __tablename__ = "Payment"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    payment_date = db.Column(db.String( 255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    method = db.Column(db.String( 255), nullable=False)
    description = db.Column(db.String( 255))
    status = db.Column(db.String( 255), nullable=False)
    transaction_id = db.Column(db.String( 255), unique=True)

    # TODO: Adding relationships
    invoice_id = db.Column(db.Integer, db.ForeignKey("Invoice.id"))    
    invoice = db.relationship("Invoice", lazy="subquery", primaryjoin="Payment.invoice_id == Invoice.id")
    branch_id = db.Column(db.Integer, db.ForeignKey("Branch.id"))    
    branch = db.relationship("Branch", lazy="subquery", primaryjoin="Payment.branch_id == Branch.id")

    @classmethod
    def find_by_id(cls, _id) -> "Payment":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Payment"]:
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
    
    def get_payment_date(self):
        return self.payment_date

    def set_payment_date(self, payment_date):
        self.payment_date = payment_date
    
    def get_amount(self):
        return self.amount

    def set_amount(self, amount):
        self.amount = amount
    
    def get_method(self):
        return self.method

    def set_method(self, method):
        self.method = method
    
    def get_description(self):
        return self.description

    def set_description(self, description):
        self.description = description
    
    def get_status(self):
        return self.status

    def set_status(self, status):
        self.status = status
    
    def get_transaction_id(self):
        return self.transaction_id

    def set_transaction_id(self, transaction_id):
        self.transaction_id = transaction_id
