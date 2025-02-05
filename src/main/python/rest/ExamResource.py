from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Exam import Exam
from schema.ExamSchema import ExamSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
exams_list_ns = Namespace('exams-resource', path="/exams")

exams_schema = ExamSchema()
exams_list_schema = ExamSchema(many=True)


class ExamResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on ExamResource")
        exams = Exam.find_by_id(id)
        if exams is not None:
            return exams_schema.dump(exams), 200
        return {"message": "Exam not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on ExamResource")
        exams_json = request.get_json()
        if exams_json["id"] is None:
            return {"message": "Invalid Exam"}, 400
        if id != exams_json["id"]:
            return {"message": "Invalid Exam"}, 400
        exams = Exam.find_by_id(id)
        if exams.get_id() is None:
            return {"message": "Invalid Exam"}, 400
        try:
            updated_exams = exams_schema.load(exams_json, instance=exams, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_exams.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return exams_schema.dump(updated_exams), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on ExamResource")
        exams_json = request.get_json()
        if exams_json["id"] is None:
            return {"message": "Invalid Exam"}, 400
        if id != exams_json["id"]:
            return {"message": "Invalid Exam"}, 400
        exams = Exam.find_by_id(id)
        if exams.get_id() is None:
            return {"message": "Invalid Exam"}, 400
        try:
            updated_exams = exams_schema.load(exams_json, instance=exams, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_exams.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return exams_schema.dump(updated_exams), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on ExamResource")
        exams = Exam.find_by_id(id)
        if exams is None:
            return {"message": "Exam not found"}, 404
        try:
            exams.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Exam deleted"}, 204


class ExamResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ExamResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        exams = Exam.find_all(page, size)
        if exams is not None:
            return exams_list_schema.dump(exams), 200
        return {"message": "Exam not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on ExamResourceList")
        exams_json = request.get_json()
        try:
            exams_data = exams_schema.load(exams_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            exams_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return exams_schema.dump(exams_data), 201


class ExamResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ExamResourceListCount")
        exams_count = Exam.find_all_count()
        if exams_count is not None:
            return exams_count, 200
        return {"message": "Exam count not found"}, 404