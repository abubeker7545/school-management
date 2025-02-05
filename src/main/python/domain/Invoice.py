from datetime import datetime
from enum import Enum
from typing import List
from . import Branch
from . import Payment
from DatabaseConfig import db
 


class Invoice(db.Model):
    __tablename__ = "Invoice"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    invoice_date = db.Column(db.String( 255), nullable=False)
    due_date = db.Column(db.String( 255), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String( 255), nullable=False)

    # TODO: Adding relationships
    branch_id = db.Column(db.Integer, db.ForeignKey("Branch.id"))    
    branch = db.relationship("Branch", lazy="subquery", primaryjoin="Invoice.branch_id == Branch.id")
    payments = db.relationship("Payment", lazy="subquery", viewonly=True)

    @classmethod
    def find_by_id(cls, _id) -> "Invoice":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Invoice"]:
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
    
    def get_invoice_date(self):
        return self.invoice_date

    def set_invoice_date(self, invoice_date):
        self.invoice_date = invoice_date
    
    def get_due_date(self):
        return self.due_date

    def set_due_date(self, due_date):
        self.due_date = due_date
    
    def get_total_amount(self):
        return self.total_amount

    def set_total_amount(self, total_amount):
        self.total_amount = total_amount
    
    def get_status(self):
        return self.status

    def set_status(self, status):
        self.status = status
