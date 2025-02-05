from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Student import Student
from schema.StudentSchema import StudentSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
students_list_ns = Namespace('students-resource', path="/students")

students_schema = StudentSchema()
students_list_schema = StudentSchema(many=True)


class StudentResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on StudentResource")
        students = Student.find_by_id(id)
        if students is not None:
            return students_schema.dump(students), 200
        return {"message": "Student not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on StudentResource")
        students_json = request.get_json()
        if students_json["id"] is None:
            return {"message": "Invalid Student"}, 400
        if id != students_json["id"]:
            return {"message": "Invalid Student"}, 400
        students = Student.find_by_id(id)
        if students.get_id() is None:
            return {"message": "Invalid Student"}, 400
        try:
            updated_students = students_schema.load(students_json, instance=students, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_students.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return students_schema.dump(updated_students), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on StudentResource")
        students_json = request.get_json()
        if students_json["id"] is None:
            return {"message": "Invalid Student"}, 400
        if id != students_json["id"]:
            return {"message": "Invalid Student"}, 400
        students = Student.find_by_id(id)
        if students.get_id() is None:
            return {"message": "Invalid Student"}, 400
        try:
            updated_students = students_schema.load(students_json, instance=students, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_students.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return students_schema.dump(updated_students), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on StudentResource")
        students = Student.find_by_id(id)
        if students is None:
            return {"message": "Student not found"}, 404
        try:
            students.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Student deleted"}, 204


class StudentResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on StudentResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        students = Student.find_all(page, size)
        if students is not None:
            return students_list_schema.dump(students), 200
        return {"message": "Student not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on StudentResourceList")
        students_json = request.get_json()
        try:
            students_data = students_schema.load(students_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            students_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return students_schema.dump(students_data), 201


class StudentResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on StudentResourceListCount")
        students_count = Student.find_all_count()
        if students_count is not None:
            return students_count, 200
        return {"message": "Student count not found"}, 404