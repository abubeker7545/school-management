from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Administrator import Administrator
from schema.AdministratorSchema import AdministratorSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
administrators_list_ns = Namespace('administrators-resource', path="/administrators")

administrators_schema = AdministratorSchema()
administrators_list_schema = AdministratorSchema(many=True)


class AdministratorResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on AdministratorResource")
        administrators = Administrator.find_by_id(id)
        if administrators is not None:
            return administrators_schema.dump(administrators), 200
        return {"message": "Administrator not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on AdministratorResource")
        administrators_json = request.get_json()
        if administrators_json["id"] is None:
            return {"message": "Invalid Administrator"}, 400
        if id != administrators_json["id"]:
            return {"message": "Invalid Administrator"}, 400
        administrators = Administrator.find_by_id(id)
        if administrators.get_id() is None:
            return {"message": "Invalid Administrator"}, 400
        try:
            updated_administrators = administrators_schema.load(administrators_json, instance=administrators, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_administrators.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return administrators_schema.dump(updated_administrators), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on AdministratorResource")
        administrators_json = request.get_json()
        if administrators_json["id"] is None:
            return {"message": "Invalid Administrator"}, 400
        if id != administrators_json["id"]:
            return {"message": "Invalid Administrator"}, 400
        administrators = Administrator.find_by_id(id)
        if administrators.get_id() is None:
            return {"message": "Invalid Administrator"}, 400
        try:
            updated_administrators = administrators_schema.load(administrators_json, instance=administrators, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_administrators.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return administrators_schema.dump(updated_administrators), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on AdministratorResource")
        administrators = Administrator.find_by_id(id)
        if administrators is None:
            return {"message": "Administrator not found"}, 404
        try:
            administrators.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Administrator deleted"}, 204


class AdministratorResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AdministratorResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        administrators = Administrator.find_all(page, size)
        if administrators is not None:
            return administrators_list_schema.dump(administrators), 200
        return {"message": "Administrator not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on AdministratorResourceList")
        administrators_json = request.get_json()
        try:
            administrators_data = administrators_schema.load(administrators_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            administrators_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return administrators_schema.dump(administrators_data), 201


class AdministratorResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AdministratorResourceListCount")
        administrators_count = Administrator.find_all_count()
        if administrators_count is not None:
            return administrators_count, 200
        return {"message": "Administrator count not found"}, 404