from datetime import datetime
from enum import Enum
from typing import List
from . import VideoContent
from . import Article
from . import LearningMaterial
from . import Quiz
from . import Discussion
from . import Course
from DatabaseConfig import db
 


class Lesson(db.Model):
    __tablename__ = "Lesson"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String( 255), nullable=False)
    content = db.Column(db.String( 255))
    order = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)

    # TODO: Adding relationships
    videos = db.relationship("VideoContent", lazy="subquery", viewonly=True)
    articles = db.relationship("Article", lazy="subquery", viewonly=True)
    learningMaterials = db.relationship("LearningMaterial", lazy="subquery", viewonly=True)
    quizzes = db.relationship("Quiz", lazy="subquery", viewonly=True)
    discussions = db.relationship("Discussion", lazy="subquery", viewonly=True)
    course_id = db.Column(db.Integer, db.ForeignKey("Course.id"))    
    course = db.relationship("Course", lazy="subquery", primaryjoin="Lesson.course_id == Course.id")

    @classmethod
    def find_by_id(cls, _id) -> "Lesson":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Lesson"]:
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
    
    def get_content(self):
        return self.content

    def set_content(self, content):
        self.content = content
    
    def get_order(self):
        return self.order

    def set_order(self, order):
        self.order = order
    
    def get_duration(self):
        return self.duration

    def set_duration(self, duration):
        self.duration = duration
