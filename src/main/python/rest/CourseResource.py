from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Course import Course
from schema.CourseSchema import CourseSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
courses_list_ns = Namespace('courses-resource', path="/courses")

courses_schema = CourseSchema()
courses_list_schema = CourseSchema(many=True)


class CourseResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on CourseResource")
        courses = Course.find_by_id(id)
        if courses is not None:
            return courses_schema.dump(courses), 200
        return {"message": "Course not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on CourseResource")
        courses_json = request.get_json()
        if courses_json["id"] is None:
            return {"message": "Invalid Course"}, 400
        if id != courses_json["id"]:
            return {"message": "Invalid Course"}, 400
        courses = Course.find_by_id(id)
        if courses.get_id() is None:
            return {"message": "Invalid Course"}, 400
        try:
            updated_courses = courses_schema.load(courses_json, instance=courses, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_courses.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return courses_schema.dump(updated_courses), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on CourseResource")
        courses_json = request.get_json()
        if courses_json["id"] is None:
            return {"message": "Invalid Course"}, 400
        if id != courses_json["id"]:
            return {"message": "Invalid Course"}, 400
        courses = Course.find_by_id(id)
        if courses.get_id() is None:
            return {"message": "Invalid Course"}, 400
        try:
            updated_courses = courses_schema.load(courses_json, instance=courses, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_courses.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return courses_schema.dump(updated_courses), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on CourseResource")
        courses = Course.find_by_id(id)
        if courses is None:
            return {"message": "Course not found"}, 404
        try:
            courses.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Course deleted"}, 204


class CourseResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on CourseResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        courses = Course.find_all(page, size)
        if courses is not None:
            return courses_list_schema.dump(courses), 200
        return {"message": "Course not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on CourseResourceList")
        courses_json = request.get_json()
        try:
            courses_data = courses_schema.load(courses_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            courses_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return courses_schema.dump(courses_data), 201


class CourseResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on CourseResourceListCount")
        courses_count = Course.find_all_count()
        if courses_count is not None:
            return courses_count, 200
        return {"message": "Course count not found"}, 404