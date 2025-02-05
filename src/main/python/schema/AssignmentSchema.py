from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Assignment import Assignment
from schema.SubjectSchema import SubjectSchema


class AssignmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Assignment
        load_instance = True
        exclude = (
            "due_date", 
        )
        sqla_session = db.session
        
    dueDate = auto_field("due_date") 
    subject = fields.Nested("SubjectSchema", required=False)
