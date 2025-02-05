from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Role import Role
from schema.RoleSchema import RoleSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
roles_list_ns = Namespace('roles-resource', path="/roles")

roles_schema = RoleSchema()
roles_list_schema = RoleSchema(many=True)


class RoleResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on RoleResource")
        roles = Role.find_by_id(id)
        if roles is not None:
            return roles_schema.dump(roles), 200
        return {"message": "Role not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on RoleResource")
        roles_json = request.get_json()
        if roles_json["id"] is None:
            return {"message": "Invalid Role"}, 400
        if id != roles_json["id"]:
            return {"message": "Invalid Role"}, 400
        roles = Role.find_by_id(id)
        if roles.get_id() is None:
            return {"message": "Invalid Role"}, 400
        try:
            updated_roles = roles_schema.load(roles_json, instance=roles, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_roles.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return roles_schema.dump(updated_roles), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on RoleResource")
        roles_json = request.get_json()
        if roles_json["id"] is None:
            return {"message": "Invalid Role"}, 400
        if id != roles_json["id"]:
            return {"message": "Invalid Role"}, 400
        roles = Role.find_by_id(id)
        if roles.get_id() is None:
            return {"message": "Invalid Role"}, 400
        try:
            updated_roles = roles_schema.load(roles_json, instance=roles, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_roles.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return roles_schema.dump(updated_roles), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on RoleResource")
        roles = Role.find_by_id(id)
        if roles is None:
            return {"message": "Role not found"}, 404
        try:
            roles.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Role deleted"}, 204


class RoleResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on RoleResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        roles = Role.find_all(page, size)
        if roles is not None:
            return roles_list_schema.dump(roles), 200
        return {"message": "Role not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on RoleResourceList")
        roles_json = request.get_json()
        try:
            roles_data = roles_schema.load(roles_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            roles_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return roles_schema.dump(roles_data), 201


class RoleResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on RoleResourceListCount")
        roles_count = Role.find_all_count()
        if roles_count is not None:
            return roles_count, 200
        return {"message": "Role count not found"}, 404