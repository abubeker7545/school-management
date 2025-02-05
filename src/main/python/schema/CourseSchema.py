from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Course import Course
from schema.TeacherSchema import TeacherSchema


class CourseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Course
        load_instance = True
        exclude = (
            "creation_date", 
        )
        sqla_session = db.session
        
    creationDate = auto_field("creation_date") 
    teacher = fields.Nested("TeacherSchema", required=False)
