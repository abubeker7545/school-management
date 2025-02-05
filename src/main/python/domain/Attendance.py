from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import ClassSession
from DatabaseConfig import db
 


class Attendance(db.Model):
    __tablename__ = "Attendance"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.String( 255), nullable=False)
    status = db.Column(db.Boolean, nullable=False)

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="Attendance.student_id == Student.id")
    classSession_id = db.Column(db.Integer, db.ForeignKey("ClassSession.id"))    
    classSession = db.relationship("ClassSession", lazy="subquery", primaryjoin="Attendance.classSession_id == ClassSession.id")

    @classmethod
    def find_by_id(cls, _id) -> "Attendance":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Attendance"]:
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
    
    def get_date(self):
        return self.date

    def set_date(self, date):
        self.date = date
    
    def get_status(self):
        return self.status

    def set_status(self, status):
        self.status = status
