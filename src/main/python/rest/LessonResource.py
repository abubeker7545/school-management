from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Lesson import Lesson
from schema.LessonSchema import LessonSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
lessons_list_ns = Namespace('lessons-resource', path="/lessons")

lessons_schema = LessonSchema()
lessons_list_schema = LessonSchema(many=True)


class LessonResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on LessonResource")
        lessons = Lesson.find_by_id(id)
        if lessons is not None:
            return lessons_schema.dump(lessons), 200
        return {"message": "Lesson not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on LessonResource")
        lessons_json = request.get_json()
        if lessons_json["id"] is None:
            return {"message": "Invalid Lesson"}, 400
        if id != lessons_json["id"]:
            return {"message": "Invalid Lesson"}, 400
        lessons = Lesson.find_by_id(id)
        if lessons.get_id() is None:
            return {"message": "Invalid Lesson"}, 400
        try:
            updated_lessons = lessons_schema.load(lessons_json, instance=lessons, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_lessons.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return lessons_schema.dump(updated_lessons), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on LessonResource")
        lessons_json = request.get_json()
        if lessons_json["id"] is None:
            return {"message": "Invalid Lesson"}, 400
        if id != lessons_json["id"]:
            return {"message": "Invalid Lesson"}, 400
        lessons = Lesson.find_by_id(id)
        if lessons.get_id() is None:
            return {"message": "Invalid Lesson"}, 400
        try:
            updated_lessons = lessons_schema.load(lessons_json, instance=lessons, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_lessons.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return lessons_schema.dump(updated_lessons), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on LessonResource")
        lessons = Lesson.find_by_id(id)
        if lessons is None:
            return {"message": "Lesson not found"}, 404
        try:
            lessons.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Lesson deleted"}, 204


class LessonResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on LessonResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        lessons = Lesson.find_all(page, size)
        if lessons is not None:
            return lessons_list_schema.dump(lessons), 200
        return {"message": "Lesson not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on LessonResourceList")
        lessons_json = request.get_json()
        try:
            lessons_data = lessons_schema.load(lessons_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            lessons_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return lessons_schema.dump(lessons_data), 201


class LessonResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on LessonResourceListCount")
        lessons_count = Lesson.find_all_count()
        if lessons_count is not None:
            return lessons_count, 200
        return {"message": "Lesson count not found"}, 404