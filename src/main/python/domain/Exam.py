from datetime import datetime
from enum import Enum
from typing import List
from . import Grade
from . import Subject
from DatabaseConfig import db
 


class Exam(db.Model):
    __tablename__ = "Exam"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String( 255), nullable=False)
    date = db.Column(db.String( 255), nullable=False)
    max_score = db.Column(db.Float, nullable=False)

    # TODO: Adding relationships
    grades = db.relationship("Grade", lazy="subquery", viewonly=True)
    subject_id = db.Column(db.Integer, db.ForeignKey("Subject.id"))    
    subject = db.relationship("Subject", lazy="subquery", primaryjoin="Exam.subject_id == Subject.id")

    @classmethod
    def find_by_id(cls, _id) -> "Exam":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Exam"]:
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
    
    def get_date(self):
        return self.date

    def set_date(self, date):
        self.date = date
    
    def get_max_score(self):
        return self.max_score

    def set_max_score(self, max_score):
        self.max_score = max_score
