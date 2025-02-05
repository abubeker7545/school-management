from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Discussion import Discussion
from schema.DiscussionSchema import DiscussionSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
discussions_list_ns = Namespace('discussions-resource', path="/discussions")

discussions_schema = DiscussionSchema()
discussions_list_schema = DiscussionSchema(many=True)


class DiscussionResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on DiscussionResource")
        discussions = Discussion.find_by_id(id)
        if discussions is not None:
            return discussions_schema.dump(discussions), 200
        return {"message": "Discussion not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on DiscussionResource")
        discussions_json = request.get_json()
        if discussions_json["id"] is None:
            return {"message": "Invalid Discussion"}, 400
        if id != discussions_json["id"]:
            return {"message": "Invalid Discussion"}, 400
        discussions = Discussion.find_by_id(id)
        if discussions.get_id() is None:
            return {"message": "Invalid Discussion"}, 400
        try:
            updated_discussions = discussions_schema.load(discussions_json, instance=discussions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_discussions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return discussions_schema.dump(updated_discussions), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on DiscussionResource")
        discussions_json = request.get_json()
        if discussions_json["id"] is None:
            return {"message": "Invalid Discussion"}, 400
        if id != discussions_json["id"]:
            return {"message": "Invalid Discussion"}, 400
        discussions = Discussion.find_by_id(id)
        if discussions.get_id() is None:
            return {"message": "Invalid Discussion"}, 400
        try:
            updated_discussions = discussions_schema.load(discussions_json, instance=discussions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_discussions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return discussions_schema.dump(updated_discussions), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on DiscussionResource")
        discussions = Discussion.find_by_id(id)
        if discussions is None:
            return {"message": "Discussion not found"}, 404
        try:
            discussions.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Discussion deleted"}, 204


class DiscussionResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on DiscussionResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        discussions = Discussion.find_all(page, size)
        if discussions is not None:
            return discussions_list_schema.dump(discussions), 200
        return {"message": "Discussion not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on DiscussionResourceList")
        discussions_json = request.get_json()
        try:
            discussions_data = discussions_schema.load(discussions_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            discussions_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return discussions_schema.dump(discussions_data), 201


class DiscussionResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on DiscussionResourceListCount")
        discussions_count = Discussion.find_all_count()
        if discussions_count is not None:
            return discussions_count, 200
        return {"message": "Discussion count not found"}, 404