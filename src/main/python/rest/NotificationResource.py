from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Notification import Notification
from schema.NotificationSchema import NotificationSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
notifications_list_ns = Namespace('notifications-resource', path="/notifications")

notifications_schema = NotificationSchema()
notifications_list_schema = NotificationSchema(many=True)


class NotificationResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on NotificationResource")
        notifications = Notification.find_by_id(id)
        if notifications is not None:
            return notifications_schema.dump(notifications), 200
        return {"message": "Notification not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on NotificationResource")
        notifications_json = request.get_json()
        if notifications_json["id"] is None:
            return {"message": "Invalid Notification"}, 400
        if id != notifications_json["id"]:
            return {"message": "Invalid Notification"}, 400
        notifications = Notification.find_by_id(id)
        if notifications.get_id() is None:
            return {"message": "Invalid Notification"}, 400
        try:
            updated_notifications = notifications_schema.load(notifications_json, instance=notifications, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_notifications.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return notifications_schema.dump(updated_notifications), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on NotificationResource")
        notifications_json = request.get_json()
        if notifications_json["id"] is None:
            return {"message": "Invalid Notification"}, 400
        if id != notifications_json["id"]:
            return {"message": "Invalid Notification"}, 400
        notifications = Notification.find_by_id(id)
        if notifications.get_id() is None:
            return {"message": "Invalid Notification"}, 400
        try:
            updated_notifications = notifications_schema.load(notifications_json, instance=notifications, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_notifications.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return notifications_schema.dump(updated_notifications), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on NotificationResource")
        notifications = Notification.find_by_id(id)
        if notifications is None:
            return {"message": "Notification not found"}, 404
        try:
            notifications.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Notification deleted"}, 204


class NotificationResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on NotificationResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        notifications = Notification.find_all(page, size)
        if notifications is not None:
            return notifications_list_schema.dump(notifications), 200
        return {"message": "Notification not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on NotificationResourceList")
        notifications_json = request.get_json()
        try:
            notifications_data = notifications_schema.load(notifications_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            notifications_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return notifications_schema.dump(notifications_data), 201


class NotificationResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on NotificationResourceListCount")
        notifications_count = Notification.find_all_count()
        if notifications_count is not None:
            return notifications_count, 200
        return {"message": "Notification count not found"}, 404