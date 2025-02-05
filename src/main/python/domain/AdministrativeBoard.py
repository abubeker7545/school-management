from datetime import datetime
from enum import Enum
from typing import List
from . import BoardMember
from . import Administrator
from DatabaseConfig import db
 

administrative_board_administrator = db.Table('administrative_board_administrator',
    db.Column('administrative board_id', db.Integer, db.ForeignKey('AdministrativeBoard.id'), primary_key=True),
    db.Column('administrator_id', db.Integer, db.ForeignKey('Administrator.id'), primary_key=True)
)

class AdministrativeBoard(db.Model):
    __tablename__ = "AdministrativeBoard"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String( 255), nullable=False, unique=True)
    description = db.Column(db.String( 255))
    creation_date = db.Column(db.String( 255), nullable=False)
    board_head = db.Column(db.String( 255))

    # TODO: Adding relationships
    members = db.relationship("BoardMember", lazy="subquery", viewonly=True)
    administrators = db.relationship("Administrator", secondary=administrative_board_administrator, lazy="subquery")

    @classmethod
    def find_by_id(cls, _id) -> "AdministrativeBoard":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["AdministrativeBoard"]:
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
    
    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name
    
    def get_description(self):
        return self.description

    def set_description(self, description):
        self.description = description
    
    def get_creation_date(self):
        return self.creation_date

    def set_creation_date(self, creation_date):
        self.creation_date = creation_date
    
    def get_board_head(self):
        return self.board_head

    def set_board_head(self, board_head):
        self.board_head = board_head
