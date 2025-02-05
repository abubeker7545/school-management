from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import Teacher
from DatabaseConfig import db
 


class Message(db.Model):
    __tablename__ = "Message"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String( 255), nullable=False)
    timestamp = db.Column(db.String( 255), nullable=False)
    sender = db.Column(db.String( 255), nullable=False)
    receiver = db.Column(db.String( 255), nullable=False)

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="Message.student_id == Student.id")
    teacher_id = db.Column(db.Integer, db.ForeignKey("Teacher.id"))    
    teacher = db.relationship("Teacher", lazy="subquery", primaryjoin="Message.teacher_id == Teacher.id")

    @classmethod
    def find_by_id(cls, _id) -> "Message":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Message"]:
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
    
    def get_timestamp(self):
        return self.timestamp

    def set_timestamp(self, timestamp):
        self.timestamp = timestamp
    
    def get_sender(self):
        return self.sender

    def set_sender(self, sender):
        self.sender = sender
    
    def get_receiver(self):
        return self.receiver

    def set_receiver(self, receiver):
        self.receiver = receiver
