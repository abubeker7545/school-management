from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import Assignment
from . import Quiz
from DatabaseConfig import db
 


class Submission(db.Model):
    __tablename__ = "Submission"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    submission_date = db.Column(db.String( 255), nullable=False)
    grade = db.Column(db.Float)
    feedback = db.Column(db.String( 255))

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="Submission.student_id == Student.id")
    assignment_id = db.Column(db.Integer, db.ForeignKey("Assignment.id"))    
    assignment = db.relationship("Assignment", lazy="subquery", primaryjoin="Submission.assignment_id == Assignment.id")
    quiz_id = db.Column(db.Integer, db.ForeignKey("Quiz.id"))    
    quiz = db.relationship("Quiz", lazy="subquery", primaryjoin="Submission.quiz_id == Quiz.id")

    @classmethod
    def find_by_id(cls, _id) -> "Submission":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Submission"]:
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
    
    def get_submission_date(self):
        return self.submission_date

    def set_submission_date(self, submission_date):
        self.submission_date = submission_date
    
    def get_grade(self):
        return self.grade

    def set_grade(self, grade):
        self.grade = grade
    
    def get_feedback(self):
        return self.feedback

    def set_feedback(self, feedback):
        self.feedback = feedback
