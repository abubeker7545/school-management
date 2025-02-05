from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Notification import Notification
from schema.StudentSchema import StudentSchema
from schema.TeacherSchema import TeacherSchema


class NotificationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Notification
        load_instance = True
        exclude = (
            "date_sent", 
            "is_read", 
        )
        sqla_session = db.session
        
    dateSent = auto_field("date_sent") 
    isRead = auto_field("is_read") 
    student = fields.Nested("StudentSchema", required=False)
    teacher = fields.Nested("TeacherSchema", required=False)
