from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.School import School


class SchoolSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = School
        load_instance = True
        exclude = (
            "established_date", 
            "contact_email", 
        )
        sqla_session = db.session
        
    establishedDate = auto_field("established_date") 
    contactEmail = auto_field("contact_email") 
