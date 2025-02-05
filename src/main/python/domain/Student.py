from datetime import datetime
from enum import Enum
from typing import List
from . import Person
from . import Attendance
from . import Grade
from . import ProgressReport
from . import Notification
from . import Message
from . import Analytics
from . import Recommendation
from . import School
from . import CourseEnrollment
from . import Submission
from . import SubscriptionDSet
from . import Comment
from DatabaseConfig import db
 


class Student(db.Model):
    __tablename__ = "Student"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String( 255), nullable=False)
    email = db.Column(db.String( 255), nullable=False, unique=True)
    parent_contact = db.Column(db.String( 255))
    grade_level = db.Column(db.Integer)

    # TODO: Adding relationships
    person_id = db.Column(db.Integer, db.ForeignKey("Person.id"))
    person = db.relationship("Person", lazy="subquery", primaryjoin="Student.person_id == Person.id")
    attendanceRecords = db.relationship("Attendance", lazy="subquery", viewonly=True)
    grades = db.relationship("Grade", lazy="subquery", viewonly=True)
    progressReports = db.relationship("ProgressReport", lazy="subquery", viewonly=True)
    notifications = db.relationship("Notification", lazy="subquery", viewonly=True)
    messages = db.relationship("Message", lazy="subquery", viewonly=True)
    analytics = db.relationship("Analytics", lazy="subquery", viewonly=True)
    recommendations = db.relationship("Recommendation", lazy="subquery", viewonly=True)
    school_id = db.Column(db.Integer, db.ForeignKey("School.id"))    
    school = db.relationship("School", lazy="subquery", primaryjoin="Student.school_id == School.id")
    courseEnrollments = db.relationship("CourseEnrollment", lazy="subquery", viewonly=True)
    submissions = db.relationship("Submission", lazy="subquery", viewonly=True)
    subscriptionDSets = db.relationship("SubscriptionDSet", lazy="subquery", viewonly=True)
    comments = db.relationship("Comment", lazy="subquery", viewonly=True)

    @classmethod
    def find_by_id(cls, _id) -> "Student":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Student"]:
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
    
    def get_parent_contact(self):
        return self.parent_contact

    def set_parent_contact(self, parent_contact):
        self.parent_contact = parent_contact
    
    def get_grade_level(self):
        return self.grade_level

    def set_grade_level(self, grade_level):
        self.grade_level = grade_level
