from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from DatabaseConfig import db
 


class Analytics(db.Model):
    __tablename__ = "Analytics"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    total_courses_completed = db.Column(db.Integer, nullable=False)
    total_assignments_submitted = db.Column(db.Integer, nullable=False)
    attendance_rate = db.Column(db.Float, nullable=False)
    average_grade = db.Column(db.Float)

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="Analytics.student_id == Student.id")

    @classmethod
    def find_by_id(cls, _id) -> "Analytics":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Analytics"]:
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
    
    def get_total_courses_completed(self):
        return self.total_courses_completed

    def set_total_courses_completed(self, total_courses_completed):
        self.total_courses_completed = total_courses_completed
    
    def get_total_assignments_submitted(self):
        return self.total_assignments_submitted

    def set_total_assignments_submitted(self, total_assignments_submitted):
        self.total_assignments_submitted = total_assignments_submitted
    
    def get_attendance_rate(self):
        return self.attendance_rate

    def set_attendance_rate(self, attendance_rate):
        self.attendance_rate = attendance_rate
    
    def get_average_grade(self):
        return self.average_grade

    def set_average_grade(self, average_grade):
        self.average_grade = average_grade
