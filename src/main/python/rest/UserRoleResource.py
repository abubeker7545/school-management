from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.UserRole import UserRole
from schema.UserRoleSchema import UserRoleSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
user_roles_list_ns = Namespace('user-roles-resource', path="/user-roles")

user_roles_schema = UserRoleSchema()
user_roles_list_schema = UserRoleSchema(many=True)


class UserRoleResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on UserRoleResource")
        user_roles = UserRole.find_by_id(id)
        if user_roles is not None:
            return user_roles_schema.dump(user_roles), 200
        return {"message": "UserRole not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on UserRoleResource")
        user_roles_json = request.get_json()
        if user_roles_json["id"] is None:
            return {"message": "Invalid UserRole"}, 400
        if id != user_roles_json["id"]:
            return {"message": "Invalid UserRole"}, 400
        user_roles = UserRole.find_by_id(id)
        if user_roles.get_id() is None:
            return {"message": "Invalid UserRole"}, 400
        try:
            updated_user_roles = user_roles_schema.load(user_roles_json, instance=user_roles, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_user_roles.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return user_roles_schema.dump(updated_user_roles), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on UserRoleResource")
        user_roles_json = request.get_json()
        if user_roles_json["id"] is None:
            return {"message": "Invalid UserRole"}, 400
        if id != user_roles_json["id"]:
            return {"message": "Invalid UserRole"}, 400
        user_roles = UserRole.find_by_id(id)
        if user_roles.get_id() is None:
            return {"message": "Invalid UserRole"}, 400
        try:
            updated_user_roles = user_roles_schema.load(user_roles_json, instance=user_roles, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_user_roles.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return user_roles_schema.dump(updated_user_roles), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on UserRoleResource")
        user_roles = UserRole.find_by_id(id)
        if user_roles is None:
            return {"message": "UserRole not found"}, 404
        try:
            user_roles.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "UserRole deleted"}, 204


class UserRoleResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on UserRoleResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        user_roles = UserRole.find_all(page, size)
        if user_roles is not None:
            return user_roles_list_schema.dump(user_roles), 200
        return {"message": "UserRole not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on UserRoleResourceList")
        user_roles_json = request.get_json()
        try:
            user_roles_data = user_roles_schema.load(user_roles_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            user_roles_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return user_roles_schema.dump(user_roles_data), 201


class UserRoleResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on UserRoleResourceListCount")
        user_roles_count = UserRole.find_all_count()
        if user_roles_count is not None:
            return user_roles_count, 200
        return {"message": "UserRole count not found"}, 404