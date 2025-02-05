from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Assignment import Assignment
from schema.AssignmentSchema import AssignmentSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
assignments_list_ns = Namespace('assignments-resource', path="/assignments")

assignments_schema = AssignmentSchema()
assignments_list_schema = AssignmentSchema(many=True)


class AssignmentResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on AssignmentResource")
        assignments = Assignment.find_by_id(id)
        if assignments is not None:
            return assignments_schema.dump(assignments), 200
        return {"message": "Assignment not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on AssignmentResource")
        assignments_json = request.get_json()
        if assignments_json["id"] is None:
            return {"message": "Invalid Assignment"}, 400
        if id != assignments_json["id"]:
            return {"message": "Invalid Assignment"}, 400
        assignments = Assignment.find_by_id(id)
        if assignments.get_id() is None:
            return {"message": "Invalid Assignment"}, 400
        try:
            updated_assignments = assignments_schema.load(assignments_json, instance=assignments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_assignments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return assignments_schema.dump(updated_assignments), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on AssignmentResource")
        assignments_json = request.get_json()
        if assignments_json["id"] is None:
            return {"message": "Invalid Assignment"}, 400
        if id != assignments_json["id"]:
            return {"message": "Invalid Assignment"}, 400
        assignments = Assignment.find_by_id(id)
        if assignments.get_id() is None:
            return {"message": "Invalid Assignment"}, 400
        try:
            updated_assignments = assignments_schema.load(assignments_json, instance=assignments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_assignments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return assignments_schema.dump(updated_assignments), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on AssignmentResource")
        assignments = Assignment.find_by_id(id)
        if assignments is None:
            return {"message": "Assignment not found"}, 404
        try:
            assignments.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Assignment deleted"}, 204


class AssignmentResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AssignmentResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        assignments = Assignment.find_all(page, size)
        if assignments is not None:
            return assignments_list_schema.dump(assignments), 200
        return {"message": "Assignment not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on AssignmentResourceList")
        assignments_json = request.get_json()
        try:
            assignments_data = assignments_schema.load(assignments_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            assignments_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return assignments_schema.dump(assignments_data), 201


class AssignmentResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AssignmentResourceListCount")
        assignments_count = Assignment.find_all_count()
        if assignments_count is not None:
            return assignments_count, 200
        return {"message": "Assignment count not found"}, 404