from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Branch import Branch
from schema.BranchSchema import BranchSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
branches_list_ns = Namespace('branches-resource', path="/branches")

branches_schema = BranchSchema()
branches_list_schema = BranchSchema(many=True)


class BranchResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on BranchResource")
        branches = Branch.find_by_id(id)
        if branches is not None:
            return branches_schema.dump(branches), 200
        return {"message": "Branch not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on BranchResource")
        branches_json = request.get_json()
        if branches_json["id"] is None:
            return {"message": "Invalid Branch"}, 400
        if id != branches_json["id"]:
            return {"message": "Invalid Branch"}, 400
        branches = Branch.find_by_id(id)
        if branches.get_id() is None:
            return {"message": "Invalid Branch"}, 400
        try:
            updated_branches = branches_schema.load(branches_json, instance=branches, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_branches.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return branches_schema.dump(updated_branches), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on BranchResource")
        branches_json = request.get_json()
        if branches_json["id"] is None:
            return {"message": "Invalid Branch"}, 400
        if id != branches_json["id"]:
            return {"message": "Invalid Branch"}, 400
        branches = Branch.find_by_id(id)
        if branches.get_id() is None:
            return {"message": "Invalid Branch"}, 400
        try:
            updated_branches = branches_schema.load(branches_json, instance=branches, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_branches.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return branches_schema.dump(updated_branches), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on BranchResource")
        branches = Branch.find_by_id(id)
        if branches is None:
            return {"message": "Branch not found"}, 404
        try:
            branches.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Branch deleted"}, 204


class BranchResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on BranchResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        branches = Branch.find_all(page, size)
        if branches is not None:
            return branches_list_schema.dump(branches), 200
        return {"message": "Branch not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on BranchResourceList")
        branches_json = request.get_json()
        try:
            branches_data = branches_schema.load(branches_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            branches_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return branches_schema.dump(branches_data), 201


class BranchResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on BranchResourceListCount")
        branches_count = Branch.find_all_count()
        if branches_count is not None:
            return branches_count, 200
        return {"message": "Branch count not found"}, 404