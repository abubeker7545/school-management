from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Grade import Grade
from schema.StudentSchema import StudentSchema
from schema.ExamSchema import ExamSchema


class GradeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Grade
        load_instance = True
        exclude = (
        )
        sqla_session = db.session
        
    student = fields.Nested("StudentSchema", required=False)
    exam = fields.Nested("ExamSchema", required=False)
