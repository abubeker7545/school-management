from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Analytics import Analytics
from schema.StudentSchema import StudentSchema


class AnalyticsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Analytics
        load_instance = True
        exclude = (
            "total_courses_completed", 
            "total_assignments_submitted", 
            "attendance_rate", 
            "average_grade", 
        )
        sqla_session = db.session
        
    totalCoursesCompleted = auto_field("total_courses_completed") 
    totalAssignmentsSubmitted = auto_field("total_assignments_submitted") 
    attendanceRate = auto_field("attendance_rate") 
    averageGrade = auto_field("average_grade") 
    student = fields.Nested("StudentSchema", required=False)
