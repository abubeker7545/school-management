from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Subject import Subject
from schema.TeacherSchema import TeacherSchema


class SubjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Subject
        load_instance = True
        exclude = (
        )
        sqla_session = db.session
        
    teacher = fields.Nested("TeacherSchema", required=False)
