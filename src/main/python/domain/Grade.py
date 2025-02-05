from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import Exam
from DatabaseConfig import db
 


class Grade(db.Model):
    __tablename__ = "Grade"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    score = db.Column(db.Float, nullable=False)
    comments = db.Column(db.String( 255))

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="Grade.student_id == Student.id")
    exam_id = db.Column(db.Integer, db.ForeignKey("Exam.id"))    
    exam = db.relationship("Exam", lazy="subquery", primaryjoin="Grade.exam_id == Exam.id")

    @classmethod
    def find_by_id(cls, _id) -> "Grade":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Grade"]:
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
    
    def get_score(self):
        return self.score

    def set_score(self, score):
        self.score = score
    
    def get_comments(self):
        return self.comments

    def set_comments(self, comments):
        self.comments = comments
