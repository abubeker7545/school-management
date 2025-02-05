from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.SubscriptionPlan import SubscriptionPlan
from schema.SubscriptionPlanSchema import SubscriptionPlanSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
subscription_plans_list_ns = Namespace('subscription-plans-resource', path="/subscription-plans")

subscription_plans_schema = SubscriptionPlanSchema()
subscription_plans_list_schema = SubscriptionPlanSchema(many=True)


class SubscriptionPlanResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on SubscriptionPlanResource")
        subscription_plans = SubscriptionPlan.find_by_id(id)
        if subscription_plans is not None:
            return subscription_plans_schema.dump(subscription_plans), 200
        return {"message": "SubscriptionPlan not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on SubscriptionPlanResource")
        subscription_plans_json = request.get_json()
        if subscription_plans_json["id"] is None:
            return {"message": "Invalid SubscriptionPlan"}, 400
        if id != subscription_plans_json["id"]:
            return {"message": "Invalid SubscriptionPlan"}, 400
        subscription_plans = SubscriptionPlan.find_by_id(id)
        if subscription_plans.get_id() is None:
            return {"message": "Invalid SubscriptionPlan"}, 400
        try:
            updated_subscription_plans = subscription_plans_schema.load(subscription_plans_json, instance=subscription_plans, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_subscription_plans.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return subscription_plans_schema.dump(updated_subscription_plans), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on SubscriptionPlanResource")
        subscription_plans_json = request.get_json()
        if subscription_plans_json["id"] is None:
            return {"message": "Invalid SubscriptionPlan"}, 400
        if id != subscription_plans_json["id"]:
            return {"message": "Invalid SubscriptionPlan"}, 400
        subscription_plans = SubscriptionPlan.find_by_id(id)
        if subscription_plans.get_id() is None:
            return {"message": "Invalid SubscriptionPlan"}, 400
        try:
            updated_subscription_plans = subscription_plans_schema.load(subscription_plans_json, instance=subscription_plans, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_subscription_plans.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return subscription_plans_schema.dump(updated_subscription_plans), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on SubscriptionPlanResource")
        subscription_plans = SubscriptionPlan.find_by_id(id)
        if subscription_plans is None:
            return {"message": "SubscriptionPlan not found"}, 404
        try:
            subscription_plans.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "SubscriptionPlan deleted"}, 204


class SubscriptionPlanResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SubscriptionPlanResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        subscription_plans = SubscriptionPlan.find_all(page, size)
        if subscription_plans is not None:
            return subscription_plans_list_schema.dump(subscription_plans), 200
        return {"message": "SubscriptionPlan not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on SubscriptionPlanResourceList")
        subscription_plans_json = request.get_json()
        try:
            subscription_plans_data = subscription_plans_schema.load(subscription_plans_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            subscription_plans_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return subscription_plans_schema.dump(subscription_plans_data), 201


class SubscriptionPlanResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on SubscriptionPlanResourceListCount")
        subscription_plans_count = SubscriptionPlan.find_all_count()
        if subscription_plans_count is not None:
            return subscription_plans_count, 200
        return {"message": "SubscriptionPlan count not found"}, 404