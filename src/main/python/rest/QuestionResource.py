from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Question import Question
from schema.QuestionSchema import QuestionSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
questions_list_ns = Namespace('questions-resource', path="/questions")

questions_schema = QuestionSchema()
questions_list_schema = QuestionSchema(many=True)


class QuestionResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on QuestionResource")
        questions = Question.find_by_id(id)
        if questions is not None:
            return questions_schema.dump(questions), 200
        return {"message": "Question not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on QuestionResource")
        questions_json = request.get_json()
        if questions_json["id"] is None:
            return {"message": "Invalid Question"}, 400
        if id != questions_json["id"]:
            return {"message": "Invalid Question"}, 400
        questions = Question.find_by_id(id)
        if questions.get_id() is None:
            return {"message": "Invalid Question"}, 400
        try:
            updated_questions = questions_schema.load(questions_json, instance=questions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_questions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return questions_schema.dump(updated_questions), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on QuestionResource")
        questions_json = request.get_json()
        if questions_json["id"] is None:
            return {"message": "Invalid Question"}, 400
        if id != questions_json["id"]:
            return {"message": "Invalid Question"}, 400
        questions = Question.find_by_id(id)
        if questions.get_id() is None:
            return {"message": "Invalid Question"}, 400
        try:
            updated_questions = questions_schema.load(questions_json, instance=questions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_questions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return questions_schema.dump(updated_questions), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on QuestionResource")
        questions = Question.find_by_id(id)
        if questions is None:
            return {"message": "Question not found"}, 404
        try:
            questions.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Question deleted"}, 204


class QuestionResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on QuestionResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        questions = Question.find_all(page, size)
        if questions is not None:
            return questions_list_schema.dump(questions), 200
        return {"message": "Question not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on QuestionResourceList")
        questions_json = request.get_json()
        try:
            questions_data = questions_schema.load(questions_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            questions_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return questions_schema.dump(questions_data), 201


class QuestionResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on QuestionResourceListCount")
        questions_count = Question.find_all_count()
        if questions_count is not None:
            return questions_count, 200
        return {"message": "Question count not found"}, 404