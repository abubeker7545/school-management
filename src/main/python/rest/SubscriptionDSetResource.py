from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.SubscriptionDSet import SubscriptionDSet
from schema.SubscriptionDSetSchema import SubscriptionDSetSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
subscription_d_sets_list_ns = Namespace('subscription-d-sets-resource', path="/subscription-d-sets")

subscription_d_sets_schema = SubscriptionDSetSchema()
subscription_d_sets_list_schema = SubscriptionDSetSchema(many=True)


class SubscriptionDSetResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on SubscriptionDSetResource")
        subscription_d_sets = SubscriptionDSet.find_by_id(id)
        if subscription_d_sets is not None:
            return subscription_d_sets_schema.dump(subscription_d_sets), 200
        return {"message": "SubscriptionDSet not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on SubscriptionDSetResource")
        subscription_d_sets_json = request.get_json()
        if subscription_d_sets_json["id"] is None:
            return {"message": "Invalid SubscriptionDSet"}, 400
        if id != subscription_d_sets_json["id"]:
            return {"message": "Invalid SubscriptionDSet"}, 400
        subscription_d_sets = SubscriptionDSet.find_by_id(id)
        if subscription_d_sets.get_id() is None:
            return {"message": "Invalid SubscriptionDSet"}, 400
        try:
            updated_subscription_d_sets = subscription_d_sets_schema.load(subscription_d_sets_json, instance=subscription_d_sets, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_subscription_d_sets.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return subscription_d_sets_schema.dump(updated_subscription_d_sets), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on SubscriptionDSetResource")
        subscription_d_sets_json = request.get_json()
        if subscription_d_sets_json["id"] is None:
            return {"message": "Invalid SubscriptionDSet"}, 400
        if id != subscription_d_sets_json["id"]:
            return {"message": "Invalid SubscriptionDSet"}, 400
        subscription_d_sets = SubscriptionDSet.find_by_id(id)
        if subscription_d_sets.get_id() is None:
            return {"message": "Invalid SubscriptionDSet"}, 400
        try:
            updated_subscription_d_sets = subscription_d_sets_schema.load(subscription_d_sets_json, instance=subscription_d_sets, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_subscription_d_sets.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return subscription_d_sets_schema.dump(updated_subscription_d_sets), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on SubscriptionDSetResource")
        subscription_d_sets = SubscriptionDSet.find_by_id(id)
        if subscription_d_sets is None:
            return {"message": "SubscriptionDSet not found"}, 404
        try:
            subscription_d_sets.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "SubscriptionDSet deleted"}, 204


class SubscriptionDSetResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SubscriptionDSetResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        subscription_d_sets = SubscriptionDSet.find_all(page, size)
        if subscription_d_sets is not None:
            return subscription_d_sets_list_schema.dump(subscription_d_sets), 200
        return {"message": "SubscriptionDSet not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on SubscriptionDSetResourceList")
        subscription_d_sets_json = request.get_json()
        try:
            subscription_d_sets_data = subscription_d_sets_schema.load(subscription_d_sets_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            subscription_d_sets_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return subscription_d_sets_schema.dump(subscription_d_sets_data), 201


class SubscriptionDSetResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SubscriptionDSetResourceListCount")
        subscription_d_sets_count = SubscriptionDSet.find_all_count()
        if subscription_d_sets_count is not None:
            return subscription_d_sets_count, 200
        return {"message": "SubscriptionDSet count not found"}, 404