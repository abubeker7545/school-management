from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Classroom import Classroom
from schema.ClassroomSchema import ClassroomSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
classrooms_list_ns = Namespace('classrooms-resource', path="/classrooms")

classrooms_schema = ClassroomSchema()
classrooms_list_schema = ClassroomSchema(many=True)


class ClassroomResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on ClassroomResource")
        classrooms = Classroom.find_by_id(id)
        if classrooms is not None:
            return classrooms_schema.dump(classrooms), 200
        return {"message": "Classroom not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on ClassroomResource")
        classrooms_json = request.get_json()
        if classrooms_json["id"] is None:
            return {"message": "Invalid Classroom"}, 400
        if id != classrooms_json["id"]:
            return {"message": "Invalid Classroom"}, 400
        classrooms = Classroom.find_by_id(id)
        if classrooms.get_id() is None:
            return {"message": "Invalid Classroom"}, 400
        try:
            updated_classrooms = classrooms_schema.load(classrooms_json, instance=classrooms, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_classrooms.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return classrooms_schema.dump(updated_classrooms), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on ClassroomResource")
        classrooms_json = request.get_json()
        if classrooms_json["id"] is None:
            return {"message": "Invalid Classroom"}, 400
        if id != classrooms_json["id"]:
            return {"message": "Invalid Classroom"}, 400
        classrooms = Classroom.find_by_id(id)
        if classrooms.get_id() is None:
            return {"message": "Invalid Classroom"}, 400
        try:
            updated_classrooms = classrooms_schema.load(classrooms_json, instance=classrooms, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_classrooms.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return classrooms_schema.dump(updated_classrooms), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on ClassroomResource")
        classrooms = Classroom.find_by_id(id)
        if classrooms is None:
            return {"message": "Classroom not found"}, 404
        try:
            classrooms.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Classroom deleted"}, 204


class ClassroomResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ClassroomResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        classrooms = Classroom.find_all(page, size)
        if classrooms is not None:
            return classrooms_list_schema.dump(classrooms), 200
        return {"message": "Classroom not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on ClassroomResourceList")
        classrooms_json = request.get_json()
        try:
            classrooms_data = classrooms_schema.load(classrooms_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            classrooms_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return classrooms_schema.dump(classrooms_data), 201


class ClassroomResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ClassroomResourceListCount")
        classrooms_count = Classroom.find_all_count()
        if classrooms_count is not None:
            return classrooms_count, 200
        return {"message": "Classroom count not found"}, 404