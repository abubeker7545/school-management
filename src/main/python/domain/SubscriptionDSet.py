from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import SubscriptionPlan
from DatabaseConfig import db
 


class SubscriptionDSet(db.Model):
    __tablename__ = "SubscriptionDSet"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    start_date = db.Column(db.String( 255), nullable=False)
    end_date = db.Column(db.String( 255), nullable=False)
    status = db.Column(db.String( 255), nullable=False)
    renewal_date = db.Column(db.String( 255))

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="SubscriptionDSet.student_id == Student.id")
    subscriptionPlans = db.relationship("SubscriptionPlan", lazy="subquery", viewonly=True)

    @classmethod
    def find_by_id(cls, _id) -> "SubscriptionDSet":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["SubscriptionDSet"]:
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
    
    def get_start_date(self):
        return self.start_date

    def set_start_date(self, start_date):
        self.start_date = start_date
    
    def get_end_date(self):
        return self.end_date

    def set_end_date(self, end_date):
        self.end_date = end_date
    
    def get_status(self):
        return self.status

    def set_status(self, status):
        self.status = status
    
    def get_renewal_date(self):
        return self.renewal_date

    def set_renewal_date(self, renewal_date):
        self.renewal_date = renewal_date
