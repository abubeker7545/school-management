from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Feedback import Feedback
from schema.FeedbackSchema import FeedbackSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
feedbacks_list_ns = Namespace('feedbacks-resource', path="/feedbacks")

feedbacks_schema = FeedbackSchema()
feedbacks_list_schema = FeedbackSchema(many=True)


class FeedbackResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on FeedbackResource")
        feedbacks = Feedback.find_by_id(id)
        if feedbacks is not None:
            return feedbacks_schema.dump(feedbacks), 200
        return {"message": "Feedback not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on FeedbackResource")
        feedbacks_json = request.get_json()
        if feedbacks_json["id"] is None:
            return {"message": "Invalid Feedback"}, 400
        if id != feedbacks_json["id"]:
            return {"message": "Invalid Feedback"}, 400
        feedbacks = Feedback.find_by_id(id)
        if feedbacks.get_id() is None:
            return {"message": "Invalid Feedback"}, 400
        try:
            updated_feedbacks = feedbacks_schema.load(feedbacks_json, instance=feedbacks, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_feedbacks.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return feedbacks_schema.dump(updated_feedbacks), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on FeedbackResource")
        feedbacks_json = request.get_json()
        if feedbacks_json["id"] is None:
            return {"message": "Invalid Feedback"}, 400
        if id != feedbacks_json["id"]:
            return {"message": "Invalid Feedback"}, 400
        feedbacks = Feedback.find_by_id(id)
        if feedbacks.get_id() is None:
            return {"message": "Invalid Feedback"}, 400
        try:
            updated_feedbacks = feedbacks_schema.load(feedbacks_json, instance=feedbacks, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_feedbacks.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return feedbacks_schema.dump(updated_feedbacks), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on FeedbackResource")
        feedbacks = Feedback.find_by_id(id)
        if feedbacks is None:
            return {"message": "Feedback not found"}, 404
        try:
            feedbacks.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Feedback deleted"}, 204


class FeedbackResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on FeedbackResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        feedbacks = Feedback.find_all(page, size)
        if feedbacks is not None:
            return feedbacks_list_schema.dump(feedbacks), 200
        return {"message": "Feedback not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on FeedbackResourceList")
        feedbacks_json = request.get_json()
        try:
            feedbacks_data = feedbacks_schema.load(feedbacks_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            feedbacks_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return feedbacks_schema.dump(feedbacks_data), 201


class FeedbackResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on FeedbackResourceListCount")
        feedbacks_count = Feedback.find_all_count()
        if feedbacks_count is not None:
            return feedbacks_count, 200
        return {"message": "Feedback count not found"}, 404