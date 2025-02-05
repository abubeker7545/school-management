from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Resource import Resource
from schema.ResourceSchema import ResourceSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
resources_list_ns = Namespace('resources-resource', path="/resources")

resources_schema = ResourceSchema()
resources_list_schema = ResourceSchema(many=True)


class ResourceResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on ResourceResource")
        resources = Resource.find_by_id(id)
        if resources is not None:
            return resources_schema.dump(resources), 200
        return {"message": "Resource not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on ResourceResource")
        resources_json = request.get_json()
        if resources_json["id"] is None:
            return {"message": "Invalid Resource"}, 400
        if id != resources_json["id"]:
            return {"message": "Invalid Resource"}, 400
        resources = Resource.find_by_id(id)
        if resources.get_id() is None:
            return {"message": "Invalid Resource"}, 400
        try:
            updated_resources = resources_schema.load(resources_json, instance=resources, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_resources.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return resources_schema.dump(updated_resources), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on ResourceResource")
        resources_json = request.get_json()
        if resources_json["id"] is None:
            return {"message": "Invalid Resource"}, 400
        if id != resources_json["id"]:
            return {"message": "Invalid Resource"}, 400
        resources = Resource.find_by_id(id)
        if resources.get_id() is None:
            return {"message": "Invalid Resource"}, 400
        try:
            updated_resources = resources_schema.load(resources_json, instance=resources, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_resources.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return resources_schema.dump(updated_resources), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on ResourceResource")
        resources = Resource.find_by_id(id)
        if resources is None:
            return {"message": "Resource not found"}, 404
        try:
            resources.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Resource deleted"}, 204


class ResourceResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ResourceResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        resources = Resource.find_all(page, size)
        if resources is not None:
            return resources_list_schema.dump(resources), 200
        return {"message": "Resource not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on ResourceResourceList")
        resources_json = request.get_json()
        try:
            resources_data = resources_schema.load(resources_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            resources_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return resources_schema.dump(resources_data), 201


class ResourceResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ResourceResourceListCount")
        resources_count = Resource.find_all_count()
        if resources_count is not None:
            return resources_count, 200
        return {"message": "Resource count not found"}, 404