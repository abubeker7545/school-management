from datetime import datetime
from enum import Enum
from typing import List
from . import Question
from . import Lesson
from . import Submission
from DatabaseConfig import db
 


class Quiz(db.Model):
    __tablename__ = "Quiz"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String( 255), nullable=False)
    total_questions = db.Column(db.Integer, nullable=False)
    max_score = db.Column(db.Float, nullable=False)

    # TODO: Adding relationships
    questions = db.relationship("Question", lazy="subquery", viewonly=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey("Lesson.id"))    
    lesson = db.relationship("Lesson", lazy="subquery", primaryjoin="Quiz.lesson_id == Lesson.id")
    submissions = db.relationship("Submission", lazy="subquery", viewonly=True)

    @classmethod
    def find_by_id(cls, _id) -> "Quiz":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Quiz"]:
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
    
    def get_total_questions(self):
        return self.total_questions

    def set_total_questions(self, total_questions):
        self.total_questions = total_questions
    
    def get_max_score(self):
        return self.max_score

    def set_max_score(self, max_score):
        self.max_score = max_score
