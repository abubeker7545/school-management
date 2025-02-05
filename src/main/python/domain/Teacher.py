from datetime import datetime
from enum import Enum
from typing import List
from . import Person
from . import Subject
from . import Course
from . import Notification
from . import Message
from . import Recommendation
from . import School
from . import Feedback
from DatabaseConfig import db
 


class Teacher(db.Model):
    __tablename__ = "Teacher"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String( 255), nullable=False)
    email = db.Column(db.String( 255), nullable=False, unique=True)
    specialization = db.Column(db.String( 255))
    hours_per_week = db.Column(db.Integer)
    max_hours_per_week = db.Column(db.Integer)
    bio = db.Column(db.String( 255))
    profile_picture = db.Column(db.String( 255))

    # TODO: Adding relationships
    person_id = db.Column(db.Integer, db.ForeignKey("Person.id"))
    person = db.relationship("Person", lazy="subquery", primaryjoin="Teacher.person_id == Person.id")
    subjects = db.relationship("Subject", lazy="subquery", viewonly=True)
    courses = db.relationship("Course", lazy="subquery", viewonly=True)
    notifications = db.relationship("Notification", lazy="subquery", viewonly=True)
    messages = db.relationship("Message", lazy="subquery", viewonly=True)
    recommendations = db.relationship("Recommendation", lazy="subquery", viewonly=True)
    school_id = db.Column(db.Integer, db.ForeignKey("School.id"))    
    school = db.relationship("School", lazy="subquery", primaryjoin="Teacher.school_id == School.id")
    feedbacks = db.relationship("Feedback", lazy="subquery", viewonly=True)

    @classmethod
    def find_by_id(cls, _id) -> "Teacher":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Teacher"]:
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
    
    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name
    
    def get_email(self):
        return self.email

    def set_email(self, email):
        self.email = email
    
    def get_specialization(self):
        return self.specialization

    def set_specialization(self, specialization):
        self.specialization = specialization
    
    def get_hours_per_week(self):
        return self.hours_per_week

    def set_hours_per_week(self, hours_per_week):
        self.hours_per_week = hours_per_week
    
    def get_max_hours_per_week(self):
        return self.max_hours_per_week

    def set_max_hours_per_week(self, max_hours_per_week):
        self.max_hours_per_week = max_hours_per_week
    
    def get_bio(self):
        return self.bio

    def set_bio(self, bio):
        self.bio = bio
    
    def get_profile_picture(self):
        return self.profile_picture

    def set_profile_picture(self, profile_picture):
        self.profile_picture = profile_picture
