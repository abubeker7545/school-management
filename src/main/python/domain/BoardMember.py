from datetime import datetime
from enum import Enum
from typing import List
from . import AdministrativeBoard
from DatabaseConfig import db
 


class BoardMember(db.Model):
    __tablename__ = "BoardMember"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    member_name = db.Column(db.String( 255), nullable=False)
    position = db.Column(db.String( 255), nullable=False)
    joining_date = db.Column(db.String( 255), nullable=False)

    # TODO: Adding relationships
    board_id = db.Column(db.Integer, db.ForeignKey("AdministrativeBoard.id"))    
    board = db.relationship("AdministrativeBoard", lazy="subquery", primaryjoin="BoardMember.board_id == AdministrativeBoard.id")

    @classmethod
    def find_by_id(cls, _id) -> "BoardMember":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["BoardMember"]:
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
    
    def get_member_name(self):
        return self.member_name

    def set_member_name(self, member_name):
        self.member_name = member_name
    
    def get_position(self):
        return self.position

    def set_position(self, position):
        self.position = position
    
    def get_joining_date(self):
        return self.joining_date

    def set_joining_date(self, joining_date):
        self.joining_date = joining_date
