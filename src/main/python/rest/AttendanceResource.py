from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Attendance import Attendance
from schema.AttendanceSchema import AttendanceSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
attendances_list_ns = Namespace('attendances-resource', path="/attendances")

attendances_schema = AttendanceSchema()
attendances_list_schema = AttendanceSchema(many=True)


class AttendanceResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on AttendanceResource")
        attendances = Attendance.find_by_id(id)
        if attendances is not None:
            return attendances_schema.dump(attendances), 200
        return {"message": "Attendance not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on AttendanceResource")
        attendances_json = request.get_json()
        if attendances_json["id"] is None:
            return {"message": "Invalid Attendance"}, 400
        if id != attendances_json["id"]:
            return {"message": "Invalid Attendance"}, 400
        attendances = Attendance.find_by_id(id)
        if attendances.get_id() is None:
            return {"message": "Invalid Attendance"}, 400
        try:
            updated_attendances = attendances_schema.load(attendances_json, instance=attendances, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_attendances.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return attendances_schema.dump(updated_attendances), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on AttendanceResource")
        attendances_json = request.get_json()
        if attendances_json["id"] is None:
            return {"message": "Invalid Attendance"}, 400
        if id != attendances_json["id"]:
            return {"message": "Invalid Attendance"}, 400
        attendances = Attendance.find_by_id(id)
        if attendances.get_id() is None:
            return {"message": "Invalid Attendance"}, 400
        try:
            updated_attendances = attendances_schema.load(attendances_json, instance=attendances, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_attendances.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return attendances_schema.dump(updated_attendances), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on AttendanceResource")
        attendances = Attendance.find_by_id(id)
        if attendances is None:
            return {"message": "Attendance not found"}, 404
        try:
            attendances.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Attendance deleted"}, 204


class AttendanceResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AttendanceResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        attendances = Attendance.find_all(page, size)
        if attendances is not None:
            return attendances_list_schema.dump(attendances), 200
        return {"message": "Attendance not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on AttendanceResourceList")
        attendances_json = request.get_json()
        try:
            attendances_data = attendances_schema.load(attendances_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            attendances_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return attendances_schema.dump(attendances_data), 201


class AttendanceResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AttendanceResourceListCount")
        attendances_count = Attendance.find_all_count()
        if attendances_count is not None:
            return attendances_count, 200
        return {"message": "Attendance count not found"}, 404