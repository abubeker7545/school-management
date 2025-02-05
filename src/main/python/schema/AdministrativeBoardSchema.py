from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.AdministrativeBoard import AdministrativeBoard
from schema.AdministratorSchema import AdministratorSchema


class AdministrativeBoardSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = AdministrativeBoard
        load_instance = True
        exclude = (
            "creation_date", 
            "board_head", 
        )
        sqla_session = db.session
        
    creationDate = auto_field("creation_date") 
    boardHead = auto_field("board_head") 
    administrators = fields.Nested("AdministratorSchema", many=True, required=False)
