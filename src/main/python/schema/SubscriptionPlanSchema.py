from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.SubscriptionPlan import SubscriptionPlan
from schema.SubscriptionDSetSchema import SubscriptionDSetSchema


class SubscriptionPlanSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SubscriptionPlan
        load_instance = True
        exclude = (
            "plan_name", 
            "duration_months", 
        )
        sqla_session = db.session
        
    planName = auto_field("plan_name") 
    durationMonths = auto_field("duration_months") 
    subscriptions = fields.Nested("SubscriptionDSetSchema", required=False)
