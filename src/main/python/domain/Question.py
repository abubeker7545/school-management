from datetime import datetime
from enum import Enum
from typing import List
from . import Quiz
from DatabaseConfig import db
 


class Question(db.Model):
    __tablename__ = "Question"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.String( 255), nullable=False)
    answer_options = db.Column(db.String( 255), nullable=False)
    correct_answer = db.Column(db.String( 255), nullable=False)
    points = db.Column(db.Float, nullable=False)

    # TODO: Adding relationships
    quiz_id = db.Column(db.Integer, db.ForeignKey("Quiz.id"))    
    quiz = db.relationship("Quiz", lazy="subquery", primaryjoin="Question.quiz_id == Quiz.id")

    @classmethod
    def find_by_id(cls, _id) -> "Question":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Question"]:
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
    
    def get_text(self):
        return self.text

    def set_text(self, text):
        self.text = text
    
    def get_answer_options(self):
        return self.answer_options

    def set_answer_options(self, answer_options):
        self.answer_options = answer_options
    
    def get_correct_answer(self):
        return self.correct_answer

    def set_correct_answer(self, correct_answer):
        self.correct_answer = correct_answer
    
    def get_points(self):
        return self.points

    def set_points(self, points):
        self.points = points
