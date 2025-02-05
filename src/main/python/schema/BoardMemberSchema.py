from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.BoardMember import BoardMember
from schema.AdministrativeBoardSchema import AdministrativeBoardSchema


class BoardMemberSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = BoardMember
        load_instance = True
        exclude = (
            "member_name", 
            "joining_date", 
        )
        sqla_session = db.session
        
    memberName = auto_field("member_name") 
    joiningDate = auto_field("joining_date") 
    board = fields.Nested("AdministrativeBoardSchema", required=False)
