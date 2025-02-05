from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.RoleAssignment import RoleAssignment
from schema.RoleAssignmentSchema import RoleAssignmentSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
role_assignments_list_ns = Namespace('role-assignments-resource', path="/role-assignments")

role_assignments_schema = RoleAssignmentSchema()
role_assignments_list_schema = RoleAssignmentSchema(many=True)


class RoleAssignmentResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on RoleAssignmentResource")
        role_assignments = RoleAssignment.find_by_id(id)
        if role_assignments is not None:
            return role_assignments_schema.dump(role_assignments), 200
        return {"message": "RoleAssignment not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on RoleAssignmentResource")
        role_assignments_json = request.get_json()
        if role_assignments_json["id"] is None:
            return {"message": "Invalid RoleAssignment"}, 400
        if id != role_assignments_json["id"]:
            return {"message": "Invalid RoleAssignment"}, 400
        role_assignments = RoleAssignment.find_by_id(id)
        if role_assignments.get_id() is None:
            return {"message": "Invalid RoleAssignment"}, 400
        try:
            updated_role_assignments = role_assignments_schema.load(role_assignments_json, instance=role_assignments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_role_assignments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return role_assignments_schema.dump(updated_role_assignments), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on RoleAssignmentResource")
        role_assignments_json = request.get_json()
        if role_assignments_json["id"] is None:
            return {"message": "Invalid RoleAssignment"}, 400
        if id != role_assignments_json["id"]:
            return {"message": "Invalid RoleAssignment"}, 400
        role_assignments = RoleAssignment.find_by_id(id)
        if role_assignments.get_id() is None:
            return {"message": "Invalid RoleAssignment"}, 400
        try:
            updated_role_assignments = role_assignments_schema.load(role_assignments_json, instance=role_assignments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_role_assignments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return role_assignments_schema.dump(updated_role_assignments), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on RoleAssignmentResource")
        role_assignments = RoleAssignment.find_by_id(id)
        if role_assignments is None:
            return {"message": "RoleAssignment not found"}, 404
        try:
            role_assignments.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "RoleAssignment deleted"}, 204


class RoleAssignmentResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on RoleAssignmentResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        role_assignments = RoleAssignment.find_all(page, size)
        if role_assignments is not None:
            return role_assignments_list_schema.dump(role_assignments), 200
        return {"message": "RoleAssignment not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on RoleAssignmentResourceList")
        role_assignments_json = request.get_json()
        try:
            role_assignments_data = role_assignments_schema.load(role_assignments_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            role_assignments_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return role_assignments_schema.dump(role_assignments_data), 201


class RoleAssignmentResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on RoleAssignmentResourceListCount")
        role_assignments_count = RoleAssignment.find_all_count()
        if role_assignments_count is not None:
            return role_assignments_count, 200
        return {"message": "RoleAssignment count not found"}, 404