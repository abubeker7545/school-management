from datetime import datetime
from enum import Enum
from typing import List
from . import Student
from DatabaseConfig import db
 


class ProgressReport(db.Model):
    __tablename__ = "ProgressReport"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    report_date = db.Column(db.String( 255), nullable=False)
    progress = db.Column(db.Float, nullable=False)
    notes = db.Column(db.String( 255))

    # TODO: Adding relationships
    student_id = db.Column(db.Integer, db.ForeignKey("Student.id"))    
    student = db.relationship("Student", lazy="subquery", primaryjoin="ProgressReport.student_id == Student.id")

    @classmethod
    def find_by_id(cls, _id) -> "ProgressReport":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["ProgressReport"]:
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
    
    def get_report_date(self):
        return self.report_date

    def set_report_date(self, report_date):
        self.report_date = report_date
    
    def get_progress(self):
        return self.progress

    def set_progress(self, progress):
        self.progress = progress
    
    def get_notes(self):
        return self.notes

    def set_notes(self, notes):
        self.notes = notes
