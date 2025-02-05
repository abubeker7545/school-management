from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.CourseEnrollment import CourseEnrollment
from schema.StudentSchema import StudentSchema
from schema.CourseSchema import CourseSchema


class CourseEnrollmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CourseEnrollment
        load_instance = True
        exclude = (
            "enrollment_date", 
            "completion_status", 
        )
        sqla_session = db.session
        
    enrollmentDate = auto_field("enrollment_date") 
    completionStatus = auto_field("completion_status") 
    student = fields.Nested("StudentSchema", required=False)
    course = fields.Nested("CourseSchema", required=False)
