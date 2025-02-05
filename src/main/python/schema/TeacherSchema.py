from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Teacher import Teacher
from schema.PersonSchema import PersonSchema
from schema.SchoolSchema import SchoolSchema


class TeacherSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Teacher
        load_instance = True
        exclude = (
            "hours_per_week", 
            "max_hours_per_week", 
            "profile_picture", 
        )
        sqla_session = db.session
        
    hoursPerWeek = auto_field("hours_per_week") 
    maxHoursPerWeek = auto_field("max_hours_per_week") 
    profilePicture = auto_field("profile_picture") 
    person = fields.Nested("PersonSchema", required=False)
    school = fields.Nested("SchoolSchema", required=False)
