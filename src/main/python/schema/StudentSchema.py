from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Student import Student
from schema.PersonSchema import PersonSchema
from schema.SchoolSchema import SchoolSchema


class StudentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Student
        load_instance = True
        exclude = (
            "parent_contact", 
            "grade_level", 
        )
        sqla_session = db.session
        
    parentContact = auto_field("parent_contact") 
    gradeLevel = auto_field("grade_level") 
    person = fields.Nested("PersonSchema", required=False)
    school = fields.Nested("SchoolSchema", required=False)
