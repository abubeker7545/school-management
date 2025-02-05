from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.ClassSession import ClassSession
from schema.ClassSessionSchema import ClassSessionSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
class_sessions_list_ns = Namespace('class-sessions-resource', path="/class-sessions")

class_sessions_schema = ClassSessionSchema()
class_sessions_list_schema = ClassSessionSchema(many=True)


class ClassSessionResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on ClassSessionResource")
        class_sessions = ClassSession.find_by_id(id)
        if class_sessions is not None:
            return class_sessions_schema.dump(class_sessions), 200
        return {"message": "ClassSession not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on ClassSessionResource")
        class_sessions_json = request.get_json()
        if class_sessions_json["id"] is None:
            return {"message": "Invalid ClassSession"}, 400
        if id != class_sessions_json["id"]:
            return {"message": "Invalid ClassSession"}, 400
        class_sessions = ClassSession.find_by_id(id)
        if class_sessions.get_id() is None:
            return {"message": "Invalid ClassSession"}, 400
        try:
            updated_class_sessions = class_sessions_schema.load(class_sessions_json, instance=class_sessions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_class_sessions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return class_sessions_schema.dump(updated_class_sessions), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on ClassSessionResource")
        class_sessions_json = request.get_json()
        if class_sessions_json["id"] is None:
            return {"message": "Invalid ClassSession"}, 400
        if id != class_sessions_json["id"]:
            return {"message": "Invalid ClassSession"}, 400
        class_sessions = ClassSession.find_by_id(id)
        if class_sessions.get_id() is None:
            return {"message": "Invalid ClassSession"}, 400
        try:
            updated_class_sessions = class_sessions_schema.load(class_sessions_json, instance=class_sessions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_class_sessions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return class_sessions_schema.dump(updated_class_sessions), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on ClassSessionResource")
        class_sessions = ClassSession.find_by_id(id)
        if class_sessions is None:
            return {"message": "ClassSession not found"}, 404
        try:
            class_sessions.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "ClassSession deleted"}, 204


class ClassSessionResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ClassSessionResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        class_sessions = ClassSession.find_all(page, size)
        if class_sessions is not None:
            return class_sessions_list_schema.dump(class_sessions), 200
        return {"message": "ClassSession not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on ClassSessionResourceList")
        class_sessions_json = request.get_json()
        try:
            class_sessions_data = class_sessions_schema.load(class_sessions_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            class_sessions_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return class_sessions_schema.dump(class_sessions_data), 201


class ClassSessionResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ClassSessionResourceListCount")
        class_sessions_count = ClassSession.find_all_count()
        if class_sessions_count is not None:
            return class_sessions_count, 200
        return {"message": "ClassSession count not found"}, 404