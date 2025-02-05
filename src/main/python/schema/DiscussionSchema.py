from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Discussion import Discussion
from schema.LessonSchema import LessonSchema


class DiscussionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Discussion
        load_instance = True
        exclude = (
            "creation_date", 
            "is_closed", 
        )
        sqla_session = db.session
        
    creationDate = auto_field("creation_date") 
    isClosed = auto_field("is_closed") 
    lesson = fields.Nested("LessonSchema", required=False)
