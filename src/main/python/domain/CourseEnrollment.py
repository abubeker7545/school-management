from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import Course
from DatabaseConfig import db
 


class CourseEnrollment(db.Model):
    __tablename__ = "CourseEnrollment"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    enrollment_date = db.Column(db.String( 255), nullable=False)
    completion_status = db.Column(db.Boolean, nullable=False)
    progress = db.Column(db.Float)

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="CourseEnrollment.student_id == Student.id")
    course_id = db.Column(db.Integer, db.ForeignKey("Course.id"))    
    course = db.relationship("Course", lazy="subquery", primaryjoin="CourseEnrollment.course_id == Course.id")

    @classmethod
    def find_by_id(cls, _id) -> "CourseEnrollment":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["CourseEnrollment"]:
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
    
    def get_enrollment_date(self):
        return self.enrollment_date

    def set_enrollment_date(self, enrollment_date):
        self.enrollment_date = enrollment_date
    
    def get_completion_status(self):
        return self.completion_status

    def set_completion_status(self, completion_status):
        self.completion_status = completion_status
    
    def get_progress(self):
        return self.progress

    def set_progress(self, progress):
        self.progress = progress
