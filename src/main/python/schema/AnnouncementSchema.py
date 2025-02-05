from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Announcement import Announcement
from schema.CourseSchema import CourseSchema


class AnnouncementSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Announcement
        load_instance = True
        exclude = (
            "creation_date", 
        )
        sqla_session = db.session
        
    creationDate = auto_field("creation_date") 
    course = fields.Nested("CourseSchema", required=False)
