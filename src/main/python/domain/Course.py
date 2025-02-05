from datetime import datetime
from enum import Enum
from typing import List
from . import Lesson
from . import LiveSession
from . import CourseEnrollment
from . import Certification
from . import Announcement
from . import Teacher
from . import Feedback
from DatabaseConfig import db
 


class Course(db.Model):
    __tablename__ = "Course"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String( 255), nullable=False)
    description = db.Column(db.String( 255))
    creation_date = db.Column(db.String( 255), nullable=False)
    duration = db.Column(db.Integer)

    # TODO: Adding relationships
    lessons = db.relationship("Lesson", lazy="subquery", viewonly=True)
    liveSessions = db.relationship("LiveSession", lazy="subquery", viewonly=True)
    enrollments = db.relationship("CourseEnrollment", lazy="subquery", viewonly=True)
    certifications = db.relationship("Certification", lazy="subquery", viewonly=True)
    announcements = db.relationship("Announcement", lazy="subquery", viewonly=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey("Teacher.id"))    
    teacher = db.relationship("Teacher", lazy="subquery", primaryjoin="Course.teacher_id == Teacher.id")
    feedbacks = db.relationship("Feedback", lazy="subquery", viewonly=True)

    @classmethod
    def find_by_id(cls, _id) -> "Course":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Course"]:
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
    
    def get_description(self):
        return self.description

    def set_description(self, description):
        self.description = description
    
    def get_creation_date(self):
        return self.creation_date

    def set_creation_date(self, creation_date):
        self.creation_date = creation_date
    
    def get_duration(self):
        return self.duration

    def set_duration(self, duration):
        self.duration = duration
