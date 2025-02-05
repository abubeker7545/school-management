from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Subject import Subject
from schema.SubjectSchema import SubjectSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
subjects_list_ns = Namespace('subjects-resource', path="/subjects")

subjects_schema = SubjectSchema()
subjects_list_schema = SubjectSchema(many=True)


class SubjectResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on SubjectResource")
        subjects = Subject.find_by_id(id)
        if subjects is not None:
            return subjects_schema.dump(subjects), 200
        return {"message": "Subject not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on SubjectResource")
        subjects_json = request.get_json()
        if subjects_json["id"] is None:
            return {"message": "Invalid Subject"}, 400
        if id != subjects_json["id"]:
            return {"message": "Invalid Subject"}, 400
        subjects = Subject.find_by_id(id)
        if subjects.get_id() is None:
            return {"message": "Invalid Subject"}, 400
        try:
            updated_subjects = subjects_schema.load(subjects_json, instance=subjects, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_subjects.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return subjects_schema.dump(updated_subjects), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on SubjectResource")
        subjects_json = request.get_json()
        if subjects_json["id"] is None:
            return {"message": "Invalid Subject"}, 400
        if id != subjects_json["id"]:
            return {"message": "Invalid Subject"}, 400
        subjects = Subject.find_by_id(id)
        if subjects.get_id() is None:
            return {"message": "Invalid Subject"}, 400
        try:
            updated_subjects = subjects_schema.load(subjects_json, instance=subjects, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_subjects.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return subjects_schema.dump(updated_subjects), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on SubjectResource")
        subjects = Subject.find_by_id(id)
        if subjects is None:
            return {"message": "Subject not found"}, 404
        try:
            subjects.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Subject deleted"}, 204


class SubjectResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SubjectResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        subjects = Subject.find_all(page, size)
        if subjects is not None:
            return subjects_list_schema.dump(subjects), 200
        return {"message": "Subject not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on SubjectResourceList")
        subjects_json = request.get_json()
        try:
            subjects_data = subjects_schema.load(subjects_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            subjects_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return subjects_schema.dump(subjects_data), 201


class SubjectResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SubjectResourceListCount")
        subjects_count = Subject.find_all_count()
        if subjects_count is not None:
            return subjects_count, 200
        return {"message": "Subject count not found"}, 404