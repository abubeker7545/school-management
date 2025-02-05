from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.ProgressReport import ProgressReport
from schema.ProgressReportSchema import ProgressReportSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
progress_reports_list_ns = Namespace('progress-reports-resource', path="/progress-reports")

progress_reports_schema = ProgressReportSchema()
progress_reports_list_schema = ProgressReportSchema(many=True)


class ProgressReportResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on ProgressReportResource")
        progress_reports = ProgressReport.find_by_id(id)
        if progress_reports is not None:
            return progress_reports_schema.dump(progress_reports), 200
        return {"message": "ProgressReport not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on ProgressReportResource")
        progress_reports_json = request.get_json()
        if progress_reports_json["id"] is None:
            return {"message": "Invalid ProgressReport"}, 400
        if id != progress_reports_json["id"]:
            return {"message": "Invalid ProgressReport"}, 400
        progress_reports = ProgressReport.find_by_id(id)
        if progress_reports.get_id() is None:
            return {"message": "Invalid ProgressReport"}, 400
        try:
            updated_progress_reports = progress_reports_schema.load(progress_reports_json, instance=progress_reports, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_progress_reports.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return progress_reports_schema.dump(updated_progress_reports), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on ProgressReportResource")
        progress_reports_json = request.get_json()
        if progress_reports_json["id"] is None:
            return {"message": "Invalid ProgressReport"}, 400
        if id != progress_reports_json["id"]:
            return {"message": "Invalid ProgressReport"}, 400
        progress_reports = ProgressReport.find_by_id(id)
        if progress_reports.get_id() is None:
            return {"message": "Invalid ProgressReport"}, 400
        try:
            updated_progress_reports = progress_reports_schema.load(progress_reports_json, instance=progress_reports, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_progress_reports.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return progress_reports_schema.dump(updated_progress_reports), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on ProgressReportResource")
        progress_reports = ProgressReport.find_by_id(id)
        if progress_reports is None:
            return {"message": "ProgressReport not found"}, 404
        try:
            progress_reports.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "ProgressReport deleted"}, 204


class ProgressReportResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ProgressReportResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        progress_reports = ProgressReport.find_all(page, size)
        if progress_reports is not None:
            return progress_reports_list_schema.dump(progress_reports), 200
        return {"message": "ProgressReport not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on ProgressReportResourceList")
        progress_reports_json = request.get_json()
        try:
            progress_reports_data = progress_reports_schema.load(progress_reports_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            progress_reports_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return progress_reports_schema.dump(progress_reports_data), 201


class ProgressReportResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ProgressReportResourceListCount")
        progress_reports_count = ProgressReport.find_all_count()
        if progress_reports_count is not None:
            return progress_reports_count, 200
        return {"message": "ProgressReport count not found"}, 404