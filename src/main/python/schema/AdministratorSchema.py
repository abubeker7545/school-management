from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Administrator import Administrator
from schema.PersonSchema import PersonSchema
from schema.SchoolSchema import SchoolSchema


class AdministratorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Administrator
        load_instance = True
        exclude = (
        )
        sqla_session = db.session
        
    person = fields.Nested("PersonSchema", required=False)
    school = fields.Nested("SchoolSchema", required=False)
