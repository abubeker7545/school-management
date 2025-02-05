from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import Teacher
from DatabaseConfig import db
 


class Recommendation(db.Model):
    __tablename__ = "Recommendation"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    recommended_courses = db.Column(db.String( 255))
    recommended_resources = db.Column(db.String( 255))

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="Recommendation.student_id == Student.id")
    teacher_id = db.Column(db.Integer, db.ForeignKey("Teacher.id"))    
    teacher = db.relationship("Teacher", lazy="subquery", primaryjoin="Recommendation.teacher_id == Teacher.id")

    @classmethod
    def find_by_id(cls, _id) -> "Recommendation":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Recommendation"]:
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
    
    def get_recommended_courses(self):
        return self.recommended_courses

    def set_recommended_courses(self, recommended_courses):
        self.recommended_courses = recommended_courses
    
    def get_recommended_resources(self):
        return self.recommended_resources

    def set_recommended_resources(self, recommended_resources):
        self.recommended_resources = recommended_resources
