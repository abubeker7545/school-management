from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Branch import Branch
from schema.SchoolSchema import SchoolSchema


class BranchSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Branch
        load_instance = True
        exclude = (
            "contact_email", 
            "established_date", 
        )
        sqla_session = db.session
        
    contactEmail = auto_field("contact_email") 
    establishedDate = auto_field("established_date") 
    school = fields.Nested("SchoolSchema", required=False)
