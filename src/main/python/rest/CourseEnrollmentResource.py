from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.CourseEnrollment import CourseEnrollment
from schema.CourseEnrollmentSchema import CourseEnrollmentSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
course_enrollments_list_ns = Namespace('course-enrollments-resource', path="/course-enrollments")

course_enrollments_schema = CourseEnrollmentSchema()
course_enrollments_list_schema = CourseEnrollmentSchema(many=True)


class CourseEnrollmentResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on CourseEnrollmentResource")
        course_enrollments = CourseEnrollment.find_by_id(id)
        if course_enrollments is not None:
            return course_enrollments_schema.dump(course_enrollments), 200
        return {"message": "CourseEnrollment not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on CourseEnrollmentResource")
        course_enrollments_json = request.get_json()
        if course_enrollments_json["id"] is None:
            return {"message": "Invalid CourseEnrollment"}, 400
        if id != course_enrollments_json["id"]:
            return {"message": "Invalid CourseEnrollment"}, 400
        course_enrollments = CourseEnrollment.find_by_id(id)
        if course_enrollments.get_id() is None:
            return {"message": "Invalid CourseEnrollment"}, 400
        try:
            updated_course_enrollments = course_enrollments_schema.load(course_enrollments_json, instance=course_enrollments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_course_enrollments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return course_enrollments_schema.dump(updated_course_enrollments), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on CourseEnrollmentResource")
        course_enrollments_json = request.get_json()
        if course_enrollments_json["id"] is None:
            return {"message": "Invalid CourseEnrollment"}, 400
        if id != course_enrollments_json["id"]:
            return {"message": "Invalid CourseEnrollment"}, 400
        course_enrollments = CourseEnrollment.find_by_id(id)
        if course_enrollments.get_id() is None:
            return {"message": "Invalid CourseEnrollment"}, 400
        try:
            updated_course_enrollments = course_enrollments_schema.load(course_enrollments_json, instance=course_enrollments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_course_enrollments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return course_enrollments_schema.dump(updated_course_enrollments), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on CourseEnrollmentResource")
        course_enrollments = CourseEnrollment.find_by_id(id)
        if course_enrollments is None:
            return {"message": "CourseEnrollment not found"}, 404
        try:
            course_enrollments.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "CourseEnrollment deleted"}, 204


class CourseEnrollmentResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on CourseEnrollmentResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        course_enrollments = CourseEnrollment.find_all(page, size)
        if course_enrollments is not None:
            return course_enrollments_list_schema.dump(course_enrollments), 200
        return {"message": "CourseEnrollment not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on CourseEnrollmentResourceList")
        course_enrollments_json = request.get_json()
        try:
            course_enrollments_data = course_enrollments_schema.load(course_enrollments_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            course_enrollments_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return course_enrollments_schema.dump(course_enrollments_data), 201


class CourseEnrollmentResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on CourseEnrollmentResourceListCount")
        course_enrollments_count = CourseEnrollment.find_all_count()
        if course_enrollments_count is not None:
            return course_enrollments_count, 200
        return {"message": "CourseEnrollment count not found"}, 404