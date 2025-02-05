from datetime import datetime
from enum import Enum
from typing import List
from . import Subject
from . import Submission
from DatabaseConfig import db
 


class Assignment(db.Model):
    __tablename__ = "Assignment"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String( 255), nullable=False)
    due_date = db.Column(db.String( 255), nullable=False)
    description = db.Column(db.String( 255))

    # TODO: Adding relationships
    subject_id = db.Column(db.Integer, db.ForeignKey("Subject.id"))    
    subject = db.relationship("Subject", lazy="subquery", primaryjoin="Assignment.subject_id == Subject.id")
    submissions = db.relationship("Submission", lazy="subquery", viewonly=True)

    @classmethod
    def find_by_id(cls, _id) -> "Assignment":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Assignment"]:
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
    
    def get_title(self):
        return self.title

    def set_title(self, title):
        self.title = title
    
    def get_due_date(self):
        return self.due_date

    def set_due_date(self, due_date):
        self.due_date = due_date
    
    def get_description(self):
        return self.description

    def set_description(self, description):
        self.description = description
