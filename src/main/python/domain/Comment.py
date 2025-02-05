from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from . import Discussion
from DatabaseConfig import db
 


class Comment(db.Model):
    __tablename__ = "Comment"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String( 255), nullable=False)
    creation_date = db.Column(db.String( 255), nullable=False)
    author = db.Column(db.String( 255), nullable=False)

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="Comment.student_id == Student.id")
    discussion_id = db.Column(db.Integer, db.ForeignKey("Discussion.id"))    
    discussion = db.relationship("Discussion", lazy="subquery", primaryjoin="Comment.discussion_id == Discussion.id")

    @classmethod
    def find_by_id(cls, _id) -> "Comment":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Comment"]:
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
    
    def get_creation_date(self):
        return self.creation_date

    def set_creation_date(self, creation_date):
        self.creation_date = creation_date
    
    def get_author(self):
        return self.author

    def set_author(self, author):
        self.author = author
