from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Grade import Grade
from schema.GradeSchema import GradeSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
grades_list_ns = Namespace('grades-resource', path="/grades")

grades_schema = GradeSchema()
grades_list_schema = GradeSchema(many=True)


class GradeResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on GradeResource")
        grades = Grade.find_by_id(id)
        if grades is not None:
            return grades_schema.dump(grades), 200
        return {"message": "Grade not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on GradeResource")
        grades_json = request.get_json()
        if grades_json["id"] is None:
            return {"message": "Invalid Grade"}, 400
        if id != grades_json["id"]:
            return {"message": "Invalid Grade"}, 400
        grades = Grade.find_by_id(id)
        if grades.get_id() is None:
            return {"message": "Invalid Grade"}, 400
        try:
            updated_grades = grades_schema.load(grades_json, instance=grades, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_grades.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return grades_schema.dump(updated_grades), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on GradeResource")
        grades_json = request.get_json()
        if grades_json["id"] is None:
            return {"message": "Invalid Grade"}, 400
        if id != grades_json["id"]:
            return {"message": "Invalid Grade"}, 400
        grades = Grade.find_by_id(id)
        if grades.get_id() is None:
            return {"message": "Invalid Grade"}, 400
        try:
            updated_grades = grades_schema.load(grades_json, instance=grades, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_grades.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return grades_schema.dump(updated_grades), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on GradeResource")
        grades = Grade.find_by_id(id)
        if grades is None:
            return {"message": "Grade not found"}, 404
        try:
            grades.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Grade deleted"}, 204


class GradeResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on GradeResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        grades = Grade.find_all(page, size)
        if grades is not None:
            return grades_list_schema.dump(grades), 200
        return {"message": "Grade not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on GradeResourceList")
        grades_json = request.get_json()
        try:
            grades_data = grades_schema.load(grades_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            grades_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return grades_schema.dump(grades_data), 201


class GradeResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on GradeResourceListCount")
        grades_count = Grade.find_all_count()
        if grades_count is not None:
            return grades_count, 200
        return {"message": "Grade count not found"}, 404