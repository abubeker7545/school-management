from datetime import datetime
from enum import Enum
from typing import List
from . import Course
from DatabaseConfig import db
 


class LiveSession(db.Model):
    __tablename__ = "LiveSession"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    session_title = db.Column(db.String( 255), nullable=False)
    session_date = db.Column(db.String( 255), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    meeting_link = db.Column(db.String( 255), nullable=False)

    # TODO: Adding relationships
    course_id = db.Column(db.Integer, db.ForeignKey("Course.id"))    
    course = db.relationship("Course", lazy="subquery", primaryjoin="LiveSession.course_id == Course.id")

    @classmethod
    def find_by_id(cls, _id) -> "LiveSession":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["LiveSession"]:
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
    
    def get_session_title(self):
        return self.session_title

    def set_session_title(self, session_title):
        self.session_title = session_title
    
    def get_session_date(self):
        return self.session_date

    def set_session_date(self, session_date):
        self.session_date = session_date
    
    def get_duration(self):
        return self.duration

    def set_duration(self, duration):
        self.duration = duration
    
    def get_meeting_link(self):
        return self.meeting_link

    def set_meeting_link(self, meeting_link):
        self.meeting_link = meeting_link
