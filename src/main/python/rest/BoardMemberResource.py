from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.BoardMember import BoardMember
from schema.BoardMemberSchema import BoardMemberSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
board_members_list_ns = Namespace('board-members-resource', path="/board-members")

board_members_schema = BoardMemberSchema()
board_members_list_schema = BoardMemberSchema(many=True)


class BoardMemberResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on BoardMemberResource")
        board_members = BoardMember.find_by_id(id)
        if board_members is not None:
            return board_members_schema.dump(board_members), 200
        return {"message": "BoardMember not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on BoardMemberResource")
        board_members_json = request.get_json()
        if board_members_json["id"] is None:
            return {"message": "Invalid BoardMember"}, 400
        if id != board_members_json["id"]:
            return {"message": "Invalid BoardMember"}, 400
        board_members = BoardMember.find_by_id(id)
        if board_members.get_id() is None:
            return {"message": "Invalid BoardMember"}, 400
        try:
            updated_board_members = board_members_schema.load(board_members_json, instance=board_members, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_board_members.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return board_members_schema.dump(updated_board_members), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on BoardMemberResource")
        board_members_json = request.get_json()
        if board_members_json["id"] is None:
            return {"message": "Invalid BoardMember"}, 400
        if id != board_members_json["id"]:
            return {"message": "Invalid BoardMember"}, 400
        board_members = BoardMember.find_by_id(id)
        if board_members.get_id() is None:
            return {"message": "Invalid BoardMember"}, 400
        try:
            updated_board_members = board_members_schema.load(board_members_json, instance=board_members, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_board_members.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return board_members_schema.dump(updated_board_members), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on BoardMemberResource")
        board_members = BoardMember.find_by_id(id)
        if board_members is None:
            return {"message": "BoardMember not found"}, 404
        try:
            board_members.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "BoardMember deleted"}, 204


class BoardMemberResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on BoardMemberResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        board_members = BoardMember.find_all(page, size)
        if board_members is not None:
            return board_members_list_schema.dump(board_members), 200
        return {"message": "BoardMember not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on BoardMemberResourceList")
        board_members_json = request.get_json()
        try:
            board_members_data = board_members_schema.load(board_members_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            board_members_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return board_members_schema.dump(board_members_data), 201


class BoardMemberResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on BoardMemberResourceListCount")
        board_members_count = BoardMember.find_all_count()
        if board_members_count is not None:
            return board_members_count, 200
        return {"message": "BoardMember count not found"}, 404