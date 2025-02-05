from datetime import datetime
from enum import Enum
from typing import List
from . import Lesson
from DatabaseConfig import db
 


class Article(db.Model):
    __tablename__ = "Article"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String( 255), nullable=False)
    content = db.Column(db.String( 255), nullable=False)
    author = db.Column(db.String( 255))

    # TODO: Adding relationships
    lesson_id = db.Column(db.Integer, db.ForeignKey("Lesson.id"))    
    lesson = db.relationship("Lesson", lazy="subquery", primaryjoin="Article.lesson_id == Lesson.id")

    @classmethod
    def find_by_id(cls, _id) -> "Article":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Article"]:
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
    
    def get_author(self):
        return self.author

    def set_author(self, author):
        self.author = author
