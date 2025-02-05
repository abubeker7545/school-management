from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Comment import Comment
from schema.CommentSchema import CommentSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
comments_list_ns = Namespace('comments-resource', path="/comments")

comments_schema = CommentSchema()
comments_list_schema = CommentSchema(many=True)


class CommentResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on CommentResource")
        comments = Comment.find_by_id(id)
        if comments is not None:
            return comments_schema.dump(comments), 200
        return {"message": "Comment not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on CommentResource")
        comments_json = request.get_json()
        if comments_json["id"] is None:
            return {"message": "Invalid Comment"}, 400
        if id != comments_json["id"]:
            return {"message": "Invalid Comment"}, 400
        comments = Comment.find_by_id(id)
        if comments.get_id() is None:
            return {"message": "Invalid Comment"}, 400
        try:
            updated_comments = comments_schema.load(comments_json, instance=comments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_comments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return comments_schema.dump(updated_comments), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on CommentResource")
        comments_json = request.get_json()
        if comments_json["id"] is None:
            return {"message": "Invalid Comment"}, 400
        if id != comments_json["id"]:
            return {"message": "Invalid Comment"}, 400
        comments = Comment.find_by_id(id)
        if comments.get_id() is None:
            return {"message": "Invalid Comment"}, 400
        try:
            updated_comments = comments_schema.load(comments_json, instance=comments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_comments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return comments_schema.dump(updated_comments), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on CommentResource")
        comments = Comment.find_by_id(id)
        if comments is None:
            return {"message": "Comment not found"}, 404
        try:
            comments.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Comment deleted"}, 204


class CommentResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on CommentResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        comments = Comment.find_all(page, size)
        if comments is not None:
            return comments_list_schema.dump(comments), 200
        return {"message": "Comment not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on CommentResourceList")
        comments_json = request.get_json()
        try:
            comments_data = comments_schema.load(comments_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            comments_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return comments_schema.dump(comments_data), 201


class CommentResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on CommentResourceListCount")
        comments_count = Comment.find_all_count()
        if comments_count is not None:
            return comments_count, 200
        return {"message": "Comment count not found"}, 404