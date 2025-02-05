from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.AdministrativeBoard import AdministrativeBoard
from schema.AdministrativeBoardSchema import AdministrativeBoardSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
administrative_boards_list_ns = Namespace('administrative-boards-resource', path="/administrative-boards")

administrative_boards_schema = AdministrativeBoardSchema()
administrative_boards_list_schema = AdministrativeBoardSchema(many=True)


class AdministrativeBoardResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on AdministrativeBoardResource")
        administrative_boards = AdministrativeBoard.find_by_id(id)
        if administrative_boards is not None:
            return administrative_boards_schema.dump(administrative_boards), 200
        return {"message": "AdministrativeBoard not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on AdministrativeBoardResource")
        administrative_boards_json = request.get_json()
        if administrative_boards_json["id"] is None:
            return {"message": "Invalid AdministrativeBoard"}, 400
        if id != administrative_boards_json["id"]:
            return {"message": "Invalid AdministrativeBoard"}, 400
        administrative_boards = AdministrativeBoard.find_by_id(id)
        if administrative_boards.get_id() is None:
            return {"message": "Invalid AdministrativeBoard"}, 400
        try:
            updated_administrative_boards = administrative_boards_schema.load(administrative_boards_json, instance=administrative_boards, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_administrative_boards.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return administrative_boards_schema.dump(updated_administrative_boards), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on AdministrativeBoardResource")
        administrative_boards_json = request.get_json()
        if administrative_boards_json["id"] is None:
            return {"message": "Invalid AdministrativeBoard"}, 400
        if id != administrative_boards_json["id"]:
            return {"message": "Invalid AdministrativeBoard"}, 400
        administrative_boards = AdministrativeBoard.find_by_id(id)
        if administrative_boards.get_id() is None:
            return {"message": "Invalid AdministrativeBoard"}, 400
        try:
            updated_administrative_boards = administrative_boards_schema.load(administrative_boards_json, instance=administrative_boards, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_administrative_boards.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return administrative_boards_schema.dump(updated_administrative_boards), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on AdministrativeBoardResource")
        administrative_boards = AdministrativeBoard.find_by_id(id)
        if administrative_boards is None:
            return {"message": "AdministrativeBoard not found"}, 404
        try:
            administrative_boards.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "AdministrativeBoard deleted"}, 204


class AdministrativeBoardResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AdministrativeBoardResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        administrative_boards = AdministrativeBoard.find_all(page, size)
        if administrative_boards is not None:
            return administrative_boards_list_schema.dump(administrative_boards), 200
        return {"message": "AdministrativeBoard not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on AdministrativeBoardResourceList")
        administrative_boards_json = request.get_json()
        try:
            administrative_boards_data = administrative_boards_schema.load(administrative_boards_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            administrative_boards_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return administrative_boards_schema.dump(administrative_boards_data), 201


class AdministrativeBoardResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AdministrativeBoardResourceListCount")
        administrative_boards_count = AdministrativeBoard.find_all_count()
        if administrative_boards_count is not None:
            return administrative_boards_count, 200
        return {"message": "AdministrativeBoard count not found"}, 404