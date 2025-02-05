from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Message import Message
from schema.MessageSchema import MessageSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
messages_list_ns = Namespace('messages-resource', path="/messages")

messages_schema = MessageSchema()
messages_list_schema = MessageSchema(many=True)


class MessageResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on MessageResource")
        messages = Message.find_by_id(id)
        if messages is not None:
            return messages_schema.dump(messages), 200
        return {"message": "Message not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on MessageResource")
        messages_json = request.get_json()
        if messages_json["id"] is None:
            return {"message": "Invalid Message"}, 400
        if id != messages_json["id"]:
            return {"message": "Invalid Message"}, 400
        messages = Message.find_by_id(id)
        if messages.get_id() is None:
            return {"message": "Invalid Message"}, 400
        try:
            updated_messages = messages_schema.load(messages_json, instance=messages, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_messages.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return messages_schema.dump(updated_messages), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on MessageResource")
        messages_json = request.get_json()
        if messages_json["id"] is None:
            return {"message": "Invalid Message"}, 400
        if id != messages_json["id"]:
            return {"message": "Invalid Message"}, 400
        messages = Message.find_by_id(id)
        if messages.get_id() is None:
            return {"message": "Invalid Message"}, 400
        try:
            updated_messages = messages_schema.load(messages_json, instance=messages, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_messages.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return messages_schema.dump(updated_messages), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on MessageResource")
        messages = Message.find_by_id(id)
        if messages is None:
            return {"message": "Message not found"}, 404
        try:
            messages.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Message deleted"}, 204


class MessageResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on MessageResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        messages = Message.find_all(page, size)
        if messages is not None:
            return messages_list_schema.dump(messages), 200
        return {"message": "Message not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on MessageResourceList")
        messages_json = request.get_json()
        try:
            messages_data = messages_schema.load(messages_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            messages_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return messages_schema.dump(messages_data), 201


class MessageResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on MessageResourceListCount")
        messages_count = Message.find_all_count()
        if messages_count is not None:
            return messages_count, 200
        return {"message": "Message count not found"}, 404