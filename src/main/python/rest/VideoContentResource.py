from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.VideoContent import VideoContent
from schema.VideoContentSchema import VideoContentSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
video_contents_list_ns = Namespace('video-contents-resource', path="/video-contents")

video_contents_schema = VideoContentSchema()
video_contents_list_schema = VideoContentSchema(many=True)


class VideoContentResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on VideoContentResource")
        video_contents = VideoContent.find_by_id(id)
        if video_contents is not None:
            return video_contents_schema.dump(video_contents), 200
        return {"message": "VideoContent not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on VideoContentResource")
        video_contents_json = request.get_json()
        if video_contents_json["id"] is None:
            return {"message": "Invalid VideoContent"}, 400
        if id != video_contents_json["id"]:
            return {"message": "Invalid VideoContent"}, 400
        video_contents = VideoContent.find_by_id(id)
        if video_contents.get_id() is None:
            return {"message": "Invalid VideoContent"}, 400
        try:
            updated_video_contents = video_contents_schema.load(video_contents_json, instance=video_contents, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_video_contents.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return video_contents_schema.dump(updated_video_contents), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on VideoContentResource")
        video_contents_json = request.get_json()
        if video_contents_json["id"] is None:
            return {"message": "Invalid VideoContent"}, 400
        if id != video_contents_json["id"]:
            return {"message": "Invalid VideoContent"}, 400
        video_contents = VideoContent.find_by_id(id)
        if video_contents.get_id() is None:
            return {"message": "Invalid VideoContent"}, 400
        try:
            updated_video_contents = video_contents_schema.load(video_contents_json, instance=video_contents, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_video_contents.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return video_contents_schema.dump(updated_video_contents), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on VideoContentResource")
        video_contents = VideoContent.find_by_id(id)
        if video_contents is None:
            return {"message": "VideoContent not found"}, 404
        try:
            video_contents.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "VideoContent deleted"}, 204


class VideoContentResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on VideoContentResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        video_contents = VideoContent.find_all(page, size)
        if video_contents is not None:
            return video_contents_list_schema.dump(video_contents), 200
        return {"message": "VideoContent not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on VideoContentResourceList")
        video_contents_json = request.get_json()
        try:
            video_contents_data = video_contents_schema.load(video_contents_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            video_contents_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return video_contents_schema.dump(video_contents_data), 201


class VideoContentResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on VideoContentResourceListCount")
        video_contents_count = VideoContent.find_all_count()
        if video_contents_count is not None:
            return video_contents_count, 200
        return {"message": "VideoContent count not found"}, 404