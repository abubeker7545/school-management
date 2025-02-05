from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Article import Article
from schema.LessonSchema import LessonSchema


class ArticleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Article
        load_instance = True
        exclude = (
        )
        sqla_session = db.session
        
    lesson = fields.Nested("LessonSchema", required=False)
