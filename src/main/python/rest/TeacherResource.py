from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Teacher import Teacher
from schema.TeacherSchema import TeacherSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
teachers_list_ns = Namespace('teachers-resource', path="/teachers")

teachers_schema = TeacherSchema()
teachers_list_schema = TeacherSchema(many=True)


class TeacherResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on TeacherResource")
        teachers = Teacher.find_by_id(id)
        if teachers is not None:
            return teachers_schema.dump(teachers), 200
        return {"message": "Teacher not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on TeacherResource")
        teachers_json = request.get_json()
        if teachers_json["id"] is None:
            return {"message": "Invalid Teacher"}, 400
        if id != teachers_json["id"]:
            return {"message": "Invalid Teacher"}, 400
        teachers = Teacher.find_by_id(id)
        if teachers.get_id() is None:
            return {"message": "Invalid Teacher"}, 400
        try:
            updated_teachers = teachers_schema.load(teachers_json, instance=teachers, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_teachers.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return teachers_schema.dump(updated_teachers), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on TeacherResource")
        teachers_json = request.get_json()
        if teachers_json["id"] is None:
            return {"message": "Invalid Teacher"}, 400
        if id != teachers_json["id"]:
            return {"message": "Invalid Teacher"}, 400
        teachers = Teacher.find_by_id(id)
        if teachers.get_id() is None:
            return {"message": "Invalid Teacher"}, 400
        try:
            updated_teachers = teachers_schema.load(teachers_json, instance=teachers, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_teachers.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return teachers_schema.dump(updated_teachers), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on TeacherResource")
        teachers = Teacher.find_by_id(id)
        if teachers is None:
            return {"message": "Teacher not found"}, 404
        try:
            teachers.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Teacher deleted"}, 204


class TeacherResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on TeacherResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        teachers = Teacher.find_all(page, size)
        if teachers is not None:
            return teachers_list_schema.dump(teachers), 200
        return {"message": "Teacher not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on TeacherResourceList")
        teachers_json = request.get_json()
        try:
            teachers_data = teachers_schema.load(teachers_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            teachers_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return teachers_schema.dump(teachers_data), 201


class TeacherResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on TeacherResourceListCount")
        teachers_count = Teacher.find_all_count()
        if teachers_count is not None:
            return teachers_count, 200
        return {"message": "Teacher count not found"}, 404