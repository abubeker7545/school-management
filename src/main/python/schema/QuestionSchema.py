from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Question import Question
from schema.QuizSchema import QuizSchema


class QuestionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Question
        load_instance = True
        exclude = (
            "answer_options", 
            "correct_answer", 
        )
        sqla_session = db.session
        
    answerOptions = auto_field("answer_options") 
    correctAnswer = auto_field("correct_answer") 
    quiz = fields.Nested("QuizSchema", required=False)
