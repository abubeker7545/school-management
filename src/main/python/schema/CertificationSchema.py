from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Certification import Certification
from schema.CourseSchema import CourseSchema


class CertificationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Certification
        load_instance = True
        exclude = (
            "certificate_name", 
            "issue_date", 
            "expiration_date", 
            "certification_url", 
        )
        sqla_session = db.session
        
    certificateName = auto_field("certificate_name") 
    issueDate = auto_field("issue_date") 
    expirationDate = auto_field("expiration_date") 
    certificationUrl = auto_field("certification_url") 
    course = fields.Nested("CourseSchema", required=False)
