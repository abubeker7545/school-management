from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Submission import Submission
from schema.StudentSchema import StudentSchema
from schema.AssignmentSchema import AssignmentSchema
from schema.QuizSchema import QuizSchema


class SubmissionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Submission
        load_instance = True
        exclude = (
            "submission_date", 
        )
        sqla_session = db.session
        
    submissionDate = auto_field("submission_date") 
    student = fields.Nested("StudentSchema", required=False)
    assignment = fields.Nested("AssignmentSchema", required=False)
    quiz = fields.Nested("QuizSchema", required=False)
