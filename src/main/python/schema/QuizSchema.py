from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Quiz import Quiz
from schema.LessonSchema import LessonSchema


class QuizSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Quiz
        load_instance = True
        exclude = (
            "total_questions", 
            "max_score", 
        )
        sqla_session = db.session
        
    totalQuestions = auto_field("total_questions") 
    maxScore = auto_field("max_score") 
    lesson = fields.Nested("LessonSchema", required=False)
