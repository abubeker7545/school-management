from datetime import datetime
from enum import Enum
from typing import List
from . import Classroom
from . import Attendance
from . import Subject
from DatabaseConfig import db
 


class ClassSession(db.Model):
    __tablename__ = "ClassSession"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    grade_level = db.Column(db.Integer, nullable=False)
    day_of_week = db.Column(db.Integer, nullable=False)
    start_time = db.Column(db.String( 255), nullable=False)
    end_time = db.Column(db.String( 255), nullable=False)

    # TODO: Adding relationships
    classrooms = db.relationship("Classroom", lazy="subquery", viewonly=True)
    attendanceRecords = db.relationship("Attendance", lazy="subquery", viewonly=True)
    subject_id = db.Column(db.Integer, db.ForeignKey("Subject.id"))    
    subject = db.relationship("Subject", lazy="subquery", primaryjoin="ClassSession.subject_id == Subject.id")

    @classmethod
    def find_by_id(cls, _id) -> "ClassSession":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["ClassSession"]:
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
    
    def get_grade_level(self):
        return self.grade_level

    def set_grade_level(self, grade_level):
        self.grade_level = grade_level
    
    def get_day_of_week(self):
        return self.day_of_week

    def set_day_of_week(self, day_of_week):
        self.day_of_week = day_of_week
    
    def get_start_time(self):
        return self.start_time

    def set_start_time(self, start_time):
        self.start_time = start_time
    
    def get_end_time(self):
        return self.end_time

    def set_end_time(self, end_time):
        self.end_time = end_time
