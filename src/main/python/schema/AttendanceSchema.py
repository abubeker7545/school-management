from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Attendance import Attendance
from schema.StudentSchema import StudentSchema
from schema.ClassSessionSchema import ClassSessionSchema


class AttendanceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Attendance
        load_instance = True
        exclude = (
        )
        sqla_session = db.session
        
    student = fields.Nested("StudentSchema", required=False)
    classSession = fields.Nested("ClassSessionSchema", required=False)
