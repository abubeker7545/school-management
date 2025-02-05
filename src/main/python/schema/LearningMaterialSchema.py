from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.LearningMaterial import LearningMaterial
from schema.LessonSchema import LessonSchema


class LearningMaterialSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LearningMaterial
        load_instance = True
        exclude = (
            "resource_url", 
        )
        sqla_session = db.session
        
    resourceUrl = auto_field("resource_url") 
    lesson = fields.Nested("LessonSchema", required=False)
