from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Payment import Payment
from schema.InvoiceSchema import InvoiceSchema
from schema.BranchSchema import BranchSchema


class PaymentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Payment
        load_instance = True
        exclude = (
            "payment_date", 
            "transaction_id", 
        )
        sqla_session = db.session
        
    paymentDate = auto_field("payment_date") 
    transactionId = auto_field("transaction_id") 
    invoice = fields.Nested("InvoiceSchema", required=False)
    branch = fields.Nested("BranchSchema", required=False)
