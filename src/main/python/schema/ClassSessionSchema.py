from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.ClassSession import ClassSession
from schema.SubjectSchema import SubjectSchema


class ClassSessionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ClassSession
        load_instance = True
        exclude = (
            "grade_level", 
            "day_of_week", 
            "start_time", 
            "end_time", 
        )
        sqla_session = db.session
        
    gradeLevel = auto_field("grade_level") 
    dayOfWeek = auto_field("day_of_week") 
    startTime = auto_field("start_time") 
    endTime = auto_field("end_time") 
    subject = fields.Nested("SubjectSchema", required=False)
