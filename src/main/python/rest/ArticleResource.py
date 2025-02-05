from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Article import Article
from schema.ArticleSchema import ArticleSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
articles_list_ns = Namespace('articles-resource', path="/articles")

articles_schema = ArticleSchema()
articles_list_schema = ArticleSchema(many=True)


class ArticleResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on ArticleResource")
        articles = Article.find_by_id(id)
        if articles is not None:
            return articles_schema.dump(articles), 200
        return {"message": "Article not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on ArticleResource")
        articles_json = request.get_json()
        if articles_json["id"] is None:
            return {"message": "Invalid Article"}, 400
        if id != articles_json["id"]:
            return {"message": "Invalid Article"}, 400
        articles = Article.find_by_id(id)
        if articles.get_id() is None:
            return {"message": "Invalid Article"}, 400
        try:
            updated_articles = articles_schema.load(articles_json, instance=articles, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_articles.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return articles_schema.dump(updated_articles), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on ArticleResource")
        articles_json = request.get_json()
        if articles_json["id"] is None:
            return {"message": "Invalid Article"}, 400
        if id != articles_json["id"]:
            return {"message": "Invalid Article"}, 400
        articles = Article.find_by_id(id)
        if articles.get_id() is None:
            return {"message": "Invalid Article"}, 400
        try:
            updated_articles = articles_schema.load(articles_json, instance=articles, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_articles.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return articles_schema.dump(updated_articles), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on ArticleResource")
        articles = Article.find_by_id(id)
        if articles is None:
            return {"message": "Article not found"}, 404
        try:
            articles.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Article deleted"}, 204


class ArticleResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ArticleResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        articles = Article.find_all(page, size)
        if articles is not None:
            return articles_list_schema.dump(articles), 200
        return {"message": "Article not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on ArticleResourceList")
        articles_json = request.get_json()
        try:
            articles_data = articles_schema.load(articles_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            articles_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return articles_schema.dump(articles_data), 201


class ArticleResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on ArticleResourceListCount")
        articles_count = Article.find_all_count()
        if articles_count is not None:
            return articles_count, 200
        return {"message": "Article count not found"}, 404