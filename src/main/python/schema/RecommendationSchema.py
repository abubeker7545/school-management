from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Recommendation import Recommendation
from schema.StudentSchema import StudentSchema
from schema.TeacherSchema import TeacherSchema


class RecommendationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Recommendation
        load_instance = True
        exclude = (
            "recommended_courses", 
            "recommended_resources", 
        )
        sqla_session = db.session
        
    recommendedCourses = auto_field("recommended_courses") 
    recommendedResources = auto_field("recommended_resources") 
    student = fields.Nested("StudentSchema", required=False)
    teacher = fields.Nested("TeacherSchema", required=False)
