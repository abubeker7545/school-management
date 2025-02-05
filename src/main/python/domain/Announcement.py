from datetime import datetime
from enum import Enum
from typing import List
from . import Course
from DatabaseConfig import db
 


class Announcement(db.Model):
    __tablename__ = "Announcement"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String( 255), nullable=False)
    content = db.Column(db.String( 255), nullable=False)
    creation_date = db.Column(db.String( 255), nullable=False)

    # TODO: Adding relationships
    course_id = db.Column(db.Integer, db.ForeignKey("Course.id"))    
    course = db.relationship("Course", lazy="subquery", primaryjoin="Announcement.course_id == Course.id")

    @classmethod
    def find_by_id(cls, _id) -> "Announcement":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Announcement"]:
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
    
    def get_creation_date(self):
        return self.creation_date

    def set_creation_date(self, creation_date):
        self.creation_date = creation_date
