from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.SubscriptionDSet import SubscriptionDSet
from schema.StudentSchema import StudentSchema


class SubscriptionDSetSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SubscriptionDSet
        load_instance = True
        exclude = (
            "start_date", 
            "end_date", 
            "renewal_date", 
        )
        sqla_session = db.session
        
    startDate = auto_field("start_date") 
    endDate = auto_field("end_date") 
    renewalDate = auto_field("renewal_date") 
    student = fields.Nested("StudentSchema", required=False)
