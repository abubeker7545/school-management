from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.UserRole import UserRole
from schema.PersonSchema import PersonSchema
from schema.RoleSchema import RoleSchema


class UserRoleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserRole
        load_instance = True
        exclude = (
            "assigned_date", 
        )
        sqla_session = db.session
        
    assignedDate = auto_field("assigned_date") 
    people = fields.Nested("PersonSchema", many=True, required=False)
    roles = fields.Nested("RoleSchema", many=True, required=False)
