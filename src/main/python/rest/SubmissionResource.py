from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Submission import Submission
from schema.SubmissionSchema import SubmissionSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
submissions_list_ns = Namespace('submissions-resource', path="/submissions")

submissions_schema = SubmissionSchema()
submissions_list_schema = SubmissionSchema(many=True)


class SubmissionResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on SubmissionResource")
        submissions = Submission.find_by_id(id)
        if submissions is not None:
            return submissions_schema.dump(submissions), 200
        return {"message": "Submission not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on SubmissionResource")
        submissions_json = request.get_json()
        if submissions_json["id"] is None:
            return {"message": "Invalid Submission"}, 400
        if id != submissions_json["id"]:
            return {"message": "Invalid Submission"}, 400
        submissions = Submission.find_by_id(id)
        if submissions.get_id() is None:
            return {"message": "Invalid Submission"}, 400
        try:
            updated_submissions = submissions_schema.load(submissions_json, instance=submissions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_submissions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return submissions_schema.dump(updated_submissions), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on SubmissionResource")
        submissions_json = request.get_json()
        if submissions_json["id"] is None:
            return {"message": "Invalid Submission"}, 400
        if id != submissions_json["id"]:
            return {"message": "Invalid Submission"}, 400
        submissions = Submission.find_by_id(id)
        if submissions.get_id() is None:
            return {"message": "Invalid Submission"}, 400
        try:
            updated_submissions = submissions_schema.load(submissions_json, instance=submissions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_submissions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return submissions_schema.dump(updated_submissions), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on SubmissionResource")
        submissions = Submission.find_by_id(id)
        if submissions is None:
            return {"message": "Submission not found"}, 404
        try:
            submissions.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Submission deleted"}, 204


class SubmissionResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SubmissionResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        submissions = Submission.find_all(page, size)
        if submissions is not None:
            return submissions_list_schema.dump(submissions), 200
        return {"message": "Submission not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on SubmissionResourceList")
        submissions_json = request.get_json()
        try:
            submissions_data = submissions_schema.load(submissions_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            submissions_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return submissions_schema.dump(submissions_data), 201


class SubmissionResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SubmissionResourceListCount")
        submissions_count = Submission.find_all_count()
        if submissions_count is not None:
            return submissions_count, 200
        return {"message": "Submission count not found"}, 404