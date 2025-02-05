from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.LiveSession import LiveSession
from schema.CourseSchema import CourseSchema


class LiveSessionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LiveSession
        load_instance = True
        exclude = (
            "session_title", 
            "session_date", 
            "meeting_link", 
        )
        sqla_session = db.session
        
    sessionTitle = auto_field("session_title") 
    sessionDate = auto_field("session_date") 
    meetingLink = auto_field("meeting_link") 
    course = fields.Nested("CourseSchema", required=False)
