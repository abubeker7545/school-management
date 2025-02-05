from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Announcement import Announcement
from schema.AnnouncementSchema import AnnouncementSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
announcements_list_ns = Namespace('announcements-resource', path="/announcements")

announcements_schema = AnnouncementSchema()
announcements_list_schema = AnnouncementSchema(many=True)


class AnnouncementResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on AnnouncementResource")
        announcements = Announcement.find_by_id(id)
        if announcements is not None:
            return announcements_schema.dump(announcements), 200
        return {"message": "Announcement not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on AnnouncementResource")
        announcements_json = request.get_json()
        if announcements_json["id"] is None:
            return {"message": "Invalid Announcement"}, 400
        if id != announcements_json["id"]:
            return {"message": "Invalid Announcement"}, 400
        announcements = Announcement.find_by_id(id)
        if announcements.get_id() is None:
            return {"message": "Invalid Announcement"}, 400
        try:
            updated_announcements = announcements_schema.load(announcements_json, instance=announcements, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_announcements.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return announcements_schema.dump(updated_announcements), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on AnnouncementResource")
        announcements_json = request.get_json()
        if announcements_json["id"] is None:
            return {"message": "Invalid Announcement"}, 400
        if id != announcements_json["id"]:
            return {"message": "Invalid Announcement"}, 400
        announcements = Announcement.find_by_id(id)
        if announcements.get_id() is None:
            return {"message": "Invalid Announcement"}, 400
        try:
            updated_announcements = announcements_schema.load(announcements_json, instance=announcements, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_announcements.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return announcements_schema.dump(updated_announcements), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on AnnouncementResource")
        announcements = Announcement.find_by_id(id)
        if announcements is None:
            return {"message": "Announcement not found"}, 404
        try:
            announcements.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Announcement deleted"}, 204


class AnnouncementResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AnnouncementResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        announcements = Announcement.find_all(page, size)
        if announcements is not None:
            return announcements_list_schema.dump(announcements), 200
        return {"message": "Announcement not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on AnnouncementResourceList")
        announcements_json = request.get_json()
        try:
            announcements_data = announcements_schema.load(announcements_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            announcements_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return announcements_schema.dump(announcements_data), 201


class AnnouncementResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AnnouncementResourceListCount")
        announcements_count = Announcement.find_all_count()
        if announcements_count is not None:
            return announcements_count, 200
        return {"message": "Announcement count not found"}, 404