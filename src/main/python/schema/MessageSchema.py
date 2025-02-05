from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Message import Message
from schema.StudentSchema import StudentSchema
from schema.TeacherSchema import TeacherSchema


class MessageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Message
        load_instance = True
        exclude = (
        )
        sqla_session = db.session
        
    student = fields.Nested("StudentSchema", required=False)
    teacher = fields.Nested("TeacherSchema", required=False)
