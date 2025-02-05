from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Person import Person


class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person
        load_instance = True
        exclude = (
            "profile_picture", 
        )
        sqla_session = db.session
        
    profilePicture = auto_field("profile_picture") 
