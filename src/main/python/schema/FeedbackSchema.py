from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Feedback import Feedback
from schema.CourseSchema import CourseSchema
from schema.TeacherSchema import TeacherSchema


class FeedbackSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Feedback
        load_instance = True
        exclude = (
            "creation_date", 
        )
        sqla_session = db.session
        
    creationDate = auto_field("creation_date") 
    course = fields.Nested("CourseSchema", required=False)
    teacher = fields.Nested("TeacherSchema", required=False)
