from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Analytics import Analytics
from schema.AnalyticsSchema import AnalyticsSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
analytics_list_ns = Namespace('analytics-resource', path="/analytics")

analytics_schema = AnalyticsSchema()
analytics_list_schema = AnalyticsSchema(many=True)


class AnalyticsResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on AnalyticsResource")
        analytics = Analytics.find_by_id(id)
        if analytics is not None:
            return analytics_schema.dump(analytics), 200
        return {"message": "Analytics not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on AnalyticsResource")
        analytics_json = request.get_json()
        if analytics_json["id"] is None:
            return {"message": "Invalid Analytics"}, 400
        if id != analytics_json["id"]:
            return {"message": "Invalid Analytics"}, 400
        analytics = Analytics.find_by_id(id)
        if analytics.get_id() is None:
            return {"message": "Invalid Analytics"}, 400
        try:
            updated_analytics = analytics_schema.load(analytics_json, instance=analytics, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_analytics.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return analytics_schema.dump(updated_analytics), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on AnalyticsResource")
        analytics_json = request.get_json()
        if analytics_json["id"] is None:
            return {"message": "Invalid Analytics"}, 400
        if id != analytics_json["id"]:
            return {"message": "Invalid Analytics"}, 400
        analytics = Analytics.find_by_id(id)
        if analytics.get_id() is None:
            return {"message": "Invalid Analytics"}, 400
        try:
            updated_analytics = analytics_schema.load(analytics_json, instance=analytics, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_analytics.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return analytics_schema.dump(updated_analytics), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on AnalyticsResource")
        analytics = Analytics.find_by_id(id)
        if analytics is None:
            return {"message": "Analytics not found"}, 404
        try:
            analytics.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Analytics deleted"}, 204


class AnalyticsResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AnalyticsResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        analytics = Analytics.find_all(page, size)
        if analytics is not None:
            return analytics_list_schema.dump(analytics), 200
        return {"message": "Analytics not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on AnalyticsResourceList")
        analytics_json = request.get_json()
        try:
            analytics_data = analytics_schema.load(analytics_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            analytics_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return analytics_schema.dump(analytics_data), 201


class AnalyticsResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AnalyticsResourceListCount")
        analytics_count = Analytics.find_all_count()
        if analytics_count is not None:
            return analytics_count, 200
        return {"message": "Analytics count not found"}, 404