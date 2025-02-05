from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Classroom import Classroom
from schema.ClassSessionSchema import ClassSessionSchema


class ClassroomSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Classroom
        load_instance = True
        exclude = (
        )
        sqla_session = db.session
        
    classSessions = fields.Nested("ClassSessionSchema", required=False)
