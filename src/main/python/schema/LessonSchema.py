from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Lesson import Lesson
from schema.CourseSchema import CourseSchema


class LessonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Lesson
        load_instance = True
        exclude = (
        )
        sqla_session = db.session
        
    course = fields.Nested("CourseSchema", required=False)
