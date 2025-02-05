from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Invoice import Invoice
from schema.BranchSchema import BranchSchema


class InvoiceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Invoice
        load_instance = True
        exclude = (
            "invoice_date", 
            "due_date", 
            "total_amount", 
        )
        sqla_session = db.session
        
    invoiceDate = auto_field("invoice_date") 
    dueDate = auto_field("due_date") 
    totalAmount = auto_field("total_amount") 
    branch = fields.Nested("BranchSchema", required=False)
