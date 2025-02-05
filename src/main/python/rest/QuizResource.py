from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Quiz import Quiz
from schema.QuizSchema import QuizSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
quizzes_list_ns = Namespace('quizzes-resource', path="/quizzes")

quizzes_schema = QuizSchema()
quizzes_list_schema = QuizSchema(many=True)


class QuizResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on QuizResource")
        quizzes = Quiz.find_by_id(id)
        if quizzes is not None:
            return quizzes_schema.dump(quizzes), 200
        return {"message": "Quiz not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on QuizResource")
        quizzes_json = request.get_json()
        if quizzes_json["id"] is None:
            return {"message": "Invalid Quiz"}, 400
        if id != quizzes_json["id"]:
            return {"message": "Invalid Quiz"}, 400
        quizzes = Quiz.find_by_id(id)
        if quizzes.get_id() is None:
            return {"message": "Invalid Quiz"}, 400
        try:
            updated_quizzes = quizzes_schema.load(quizzes_json, instance=quizzes, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_quizzes.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return quizzes_schema.dump(updated_quizzes), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on QuizResource")
        quizzes_json = request.get_json()
        if quizzes_json["id"] is None:
            return {"message": "Invalid Quiz"}, 400
        if id != quizzes_json["id"]:
            return {"message": "Invalid Quiz"}, 400
        quizzes = Quiz.find_by_id(id)
        if quizzes.get_id() is None:
            return {"message": "Invalid Quiz"}, 400
        try:
            updated_quizzes = quizzes_schema.load(quizzes_json, instance=quizzes, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_quizzes.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return quizzes_schema.dump(updated_quizzes), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on QuizResource")
        quizzes = Quiz.find_by_id(id)
        if quizzes is None:
            return {"message": "Quiz not found"}, 404
        try:
            quizzes.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Quiz deleted"}, 204


class QuizResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on QuizResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        quizzes = Quiz.find_all(page, size)
        if quizzes is not None:
            return quizzes_list_schema.dump(quizzes), 200
        return {"message": "Quiz not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on QuizResourceList")
        quizzes_json = request.get_json()
        try:
            quizzes_data = quizzes_schema.load(quizzes_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            quizzes_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return quizzes_schema.dump(quizzes_data), 201


class QuizResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on QuizResourceListCount")
        quizzes_count = Quiz.find_all_count()
        if quizzes_count is not None:
            return quizzes_count, 200
        return {"message": "Quiz count not found"}, 404