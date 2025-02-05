from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.School import School
from schema.SchoolSchema import SchoolSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
schools_list_ns = Namespace('schools-resource', path="/schools")

schools_schema = SchoolSchema()
schools_list_schema = SchoolSchema(many=True)


class SchoolResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on SchoolResource")
        schools = School.find_by_id(id)
        if schools is not None:
            return schools_schema.dump(schools), 200
        return {"message": "School not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on SchoolResource")
        schools_json = request.get_json()
        if schools_json["id"] is None:
            return {"message": "Invalid School"}, 400
        if id != schools_json["id"]:
            return {"message": "Invalid School"}, 400
        schools = School.find_by_id(id)
        if schools.get_id() is None:
            return {"message": "Invalid School"}, 400
        try:
            updated_schools = schools_schema.load(schools_json, instance=schools, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_schools.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return schools_schema.dump(updated_schools), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on SchoolResource")
        schools_json = request.get_json()
        if schools_json["id"] is None:
            return {"message": "Invalid School"}, 400
        if id != schools_json["id"]:
            return {"message": "Invalid School"}, 400
        schools = School.find_by_id(id)
        if schools.get_id() is None:
            return {"message": "Invalid School"}, 400
        try:
            updated_schools = schools_schema.load(schools_json, instance=schools, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_schools.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return schools_schema.dump(updated_schools), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on SchoolResource")
        schools = School.find_by_id(id)
        if schools is None:
            return {"message": "School not found"}, 404
        try:
            schools.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "School deleted"}, 204


class SchoolResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SchoolResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        schools = School.find_all(page, size)
        if schools is not None:
            return schools_list_schema.dump(schools), 200
        return {"message": "School not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on SchoolResourceList")
        schools_json = request.get_json()
        try:
            schools_data = schools_schema.load(schools_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            schools_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return schools_schema.dump(schools_data), 201


class SchoolResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SchoolResourceListCount")
        schools_count = School.find_all_count()
        if schools_count is not None:
            return schools_count, 200
        return {"message": "School count not found"}, 404