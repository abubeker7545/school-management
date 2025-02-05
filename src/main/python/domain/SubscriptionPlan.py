from datetime import datetime
from enum import Enum
from typing import List
from . import SubscriptionDSet
from DatabaseConfig import db
 


class SubscriptionPlan(db.Model):
    __tablename__ = "SubscriptionPlan"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plan_name = db.Column(db.String( 255), nullable=False, unique=True)
    price = db.Column(db.Float, nullable=False)
    duration_months = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String( 255))

    # TODO: Adding relationships
    subscriptions_id = db.Column(db.Integer, db.ForeignKey("SubscriptionDSet.id"))    
    subscriptions = db.relationship("SubscriptionDSet", lazy="subquery", primaryjoin="SubscriptionPlan.subscriptions_id == SubscriptionDSet.id")

    @classmethod
    def find_by_id(cls, _id) -> "SubscriptionPlan":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["SubscriptionPlan"]:
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
    
    def get_plan_name(self):
        return self.plan_name

    def set_plan_name(self, plan_name):
        self.plan_name = plan_name
    
    def get_price(self):
        return self.price

    def set_price(self, price):
        self.price = price
    
    def get_duration_months(self):
        return self.duration_months

    def set_duration_months(self, duration_months):
        self.duration_months = duration_months
    
    def get_description(self):
        return self.description

    def set_description(self, description):
        self.description = description
