from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.RoleAssignment import RoleAssignment


class RoleAssignmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = RoleAssignment
        load_instance = True
        exclude = (
            "role_type", 
            "effective_date", 
            "expiration_date", 
        )
        sqla_session = db.session
        
    roleType = auto_field("role_type") 
    effectiveDate = auto_field("effective_date") 
    expirationDate = auto_field("expiration_date") 
