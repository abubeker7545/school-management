from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.ProgressReport import ProgressReport
from schema.StudentSchema import StudentSchema


class ProgressReportSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ProgressReport
        load_instance = True
        exclude = (
            "report_date", 
        )
        sqla_session = db.session
        
    reportDate = auto_field("report_date") 
    student = fields.Nested("StudentSchema", required=False)
