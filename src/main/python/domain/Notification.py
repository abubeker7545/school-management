from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import Teacher
from DatabaseConfig import db
 


class Notification(db.Model):
    __tablename__ = "Notification"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String( 255), nullable=False)
    date_sent = db.Column(db.String( 255), nullable=False)
    is_read = db.Column(db.Boolean, nullable=False)

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="Notification.student_id == Student.id")
    teacher_id = db.Column(db.Integer, db.ForeignKey("Teacher.id"))    
    teacher = db.relationship("Teacher", lazy="subquery", primaryjoin="Notification.teacher_id == Teacher.id")

    @classmethod
    def find_by_id(cls, _id) -> "Notification":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Notification"]:
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
    
    def get_content(self):
        return self.content

    def set_content(self, content):
        self.content = content
    
    def get_date_sent(self):
        return self.date_sent

    def set_date_sent(self, date_sent):
        self.date_sent = date_sent
    
    def get_is_read(self):
        return self.is_read

    def set_is_read(self, is_read):
        self.is_read = is_read
