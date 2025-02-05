from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.LiveSession import LiveSession
from schema.LiveSessionSchema import LiveSessionSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
live_sessions_list_ns = Namespace('live-sessions-resource', path="/live-sessions")

live_sessions_schema = LiveSessionSchema()
live_sessions_list_schema = LiveSessionSchema(many=True)


class LiveSessionResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on LiveSessionResource")
        live_sessions = LiveSession.find_by_id(id)
        if live_sessions is not None:
            return live_sessions_schema.dump(live_sessions), 200
        return {"message": "LiveSession not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on LiveSessionResource")
        live_sessions_json = request.get_json()
        if live_sessions_json["id"] is None:
            return {"message": "Invalid LiveSession"}, 400
        if id != live_sessions_json["id"]:
            return {"message": "Invalid LiveSession"}, 400
        live_sessions = LiveSession.find_by_id(id)
        if live_sessions.get_id() is None:
            return {"message": "Invalid LiveSession"}, 400
        try:
            updated_live_sessions = live_sessions_schema.load(live_sessions_json, instance=live_sessions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_live_sessions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return live_sessions_schema.dump(updated_live_sessions), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on LiveSessionResource")
        live_sessions_json = request.get_json()
        if live_sessions_json["id"] is None:
            return {"message": "Invalid LiveSession"}, 400
        if id != live_sessions_json["id"]:
            return {"message": "Invalid LiveSession"}, 400
        live_sessions = LiveSession.find_by_id(id)
        if live_sessions.get_id() is None:
            return {"message": "Invalid LiveSession"}, 400
        try:
            updated_live_sessions = live_sessions_schema.load(live_sessions_json, instance=live_sessions, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_live_sessions.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return live_sessions_schema.dump(updated_live_sessions), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on LiveSessionResource")
        live_sessions = LiveSession.find_by_id(id)
        if live_sessions is None:
            return {"message": "LiveSession not found"}, 404
        try:
            live_sessions.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "LiveSession deleted"}, 204


class LiveSessionResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on LiveSessionResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        live_sessions = LiveSession.find_all(page, size)
        if live_sessions is not None:
            return live_sessions_list_schema.dump(live_sessions), 200
        return {"message": "LiveSession not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on LiveSessionResourceList")
        live_sessions_json = request.get_json()
        try:
            live_sessions_data = live_sessions_schema.load(live_sessions_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            live_sessions_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return live_sessions_schema.dump(live_sessions_data), 201


class LiveSessionResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on LiveSessionResourceListCount")
        live_sessions_count = LiveSession.find_all_count()
        if live_sessions_count is not None:
            return live_sessions_count, 200
        return {"message": "LiveSession count not found"}, 404