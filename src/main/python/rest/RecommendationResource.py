from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Recommendation import Recommendation
from schema.RecommendationSchema import RecommendationSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
recommendations_list_ns = Namespace('recommendations-resource', path="/recommendations")

recommendations_schema = RecommendationSchema()
recommendations_list_schema = RecommendationSchema(many=True)


class RecommendationResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on RecommendationResource")
        recommendations = Recommendation.find_by_id(id)
        if recommendations is not None:
            return recommendations_schema.dump(recommendations), 200
        return {"message": "Recommendation not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on RecommendationResource")
        recommendations_json = request.get_json()
        if recommendations_json["id"] is None:
            return {"message": "Invalid Recommendation"}, 400
        if id != recommendations_json["id"]:
            return {"message": "Invalid Recommendation"}, 400
        recommendations = Recommendation.find_by_id(id)
        if recommendations.get_id() is None:
            return {"message": "Invalid Recommendation"}, 400
        try:
            updated_recommendations = recommendations_schema.load(recommendations_json, instance=recommendations, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_recommendations.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return recommendations_schema.dump(updated_recommendations), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on RecommendationResource")
        recommendations_json = request.get_json()
        if recommendations_json["id"] is None:
            return {"message": "Invalid Recommendation"}, 400
        if id != recommendations_json["id"]:
            return {"message": "Invalid Recommendation"}, 400
        recommendations = Recommendation.find_by_id(id)
        if recommendations.get_id() is None:
            return {"message": "Invalid Recommendation"}, 400
        try:
            updated_recommendations = recommendations_schema.load(recommendations_json, instance=recommendations, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_recommendations.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return recommendations_schema.dump(updated_recommendations), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on RecommendationResource")
        recommendations = Recommendation.find_by_id(id)
        if recommendations is None:
            return {"message": "Recommendation not found"}, 404
        try:
            recommendations.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Recommendation deleted"}, 204


class RecommendationResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on RecommendationResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        recommendations = Recommendation.find_all(page, size)
        if recommendations is not None:
            return recommendations_list_schema.dump(recommendations), 200
        return {"message": "Recommendation not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on RecommendationResourceList")
        recommendations_json = request.get_json()
        try:
            recommendations_data = recommendations_schema.load(recommendations_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            recommendations_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return recommendations_schema.dump(recommendations_data), 201


class RecommendationResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on RecommendationResourceListCount")
        recommendations_count = Recommendation.find_all_count()
        if recommendations_count is not None:
            return recommendations_count, 200
        return {"message": "Recommendation count not found"}, 404