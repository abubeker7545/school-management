from datetime import datetime
from enum import Enum
from typing import List
from . import Comment
from . import Lesson
from DatabaseConfig import db
 


class Discussion(db.Model):
    __tablename__ = "Discussion"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String( 255), nullable=False)
    creation_date = db.Column(db.String( 255), nullable=False)
    is_closed = db.Column(db.Boolean, nullable=False)

    # TODO: Adding relationships
    comments = db.relationship("Comment", lazy="subquery", viewonly=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey("Lesson.id"))    
    lesson = db.relationship("Lesson", lazy="subquery", primaryjoin="Discussion.lesson_id == Lesson.id")

    @classmethod
    def find_by_id(cls, _id) -> "Discussion":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Discussion"]:
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
    
    def get_creation_date(self):
        return self.creation_date

    def set_creation_date(self, creation_date):
        self.creation_date = creation_date
    
    def get_is_closed(self):
        return self.is_closed

    def set_is_closed(self, is_closed):
        self.is_closed = is_closed
