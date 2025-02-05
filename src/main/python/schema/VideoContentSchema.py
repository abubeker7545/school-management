from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.VideoContent import VideoContent
from schema.LessonSchema import LessonSchema


class VideoContentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = VideoContent
        load_instance = True
        exclude = (
            "video_url", 
        )
        sqla_session = db.session
        
    videoUrl = auto_field("video_url") 
    lesson = fields.Nested("LessonSchema", required=False)
