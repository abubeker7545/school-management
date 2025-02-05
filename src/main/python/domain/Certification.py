from datetime import datetime
from enum import Enum
from typing import List
from . import Course
from DatabaseConfig import db
 


class Certification(db.Model):
    __tablename__ = "Certification"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    certificate_name = db.Column(db.String( 255), nullable=False)
    issue_date = db.Column(db.String( 255), nullable=False)
    expiration_date = db.Column(db.String( 255))
    certification_url = db.Column(db.String( 255))

    # TODO: Adding relationships
    course_id = db.Column(db.Integer, db.ForeignKey("Course.id"))    
    course = db.relationship("Course", lazy="subquery", primaryjoin="Certification.course_id == Course.id")

    @classmethod
    def find_by_id(cls, _id) -> "Certification":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Certification"]:
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
    
    def get_certificate_name(self):
        return self.certificate_name

    def set_certificate_name(self, certificate_name):
        self.certificate_name = certificate_name
    
    def get_issue_date(self):
        return self.issue_date

    def set_issue_date(self, issue_date):
        self.issue_date = issue_date
    
    def get_expiration_date(self):
        return self.expiration_date

    def set_expiration_date(self, expiration_date):
        self.expiration_date = expiration_date
    
    def get_certification_url(self):
        return self.certification_url

    def set_certification_url(self, certification_url):
        self.certification_url = certification_url
