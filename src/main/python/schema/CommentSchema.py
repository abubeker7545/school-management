from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Comment import Comment
from schema.StudentSchema import StudentSchema
from schema.DiscussionSchema import DiscussionSchema


class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        load_instance = True
        exclude = (
            "creation_date", 
        )
        sqla_session = db.session
        
    creationDate = auto_field("creation_date") 
    student = fields.Nested("StudentSchema", required=False)
    discussion = fields.Nested("DiscussionSchema", required=False)
