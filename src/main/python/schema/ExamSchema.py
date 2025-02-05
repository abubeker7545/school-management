from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Exam import Exam
from schema.SubjectSchema import SubjectSchema


class ExamSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Exam
        load_instance = True
        exclude = (
            "max_score", 
        )
        sqla_session = db.session
        
    maxScore = auto_field("max_score") 
    subject = fields.Nested("SubjectSchema", required=False)
