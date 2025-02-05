from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Payment import Payment
from schema.PaymentSchema import PaymentSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
payments_list_ns = Namespace('payments-resource', path="/payments")

payments_schema = PaymentSchema()
payments_list_schema = PaymentSchema(many=True)


class PaymentResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on PaymentResource")
        payments = Payment.find_by_id(id)
        if payments is not None:
            return payments_schema.dump(payments), 200
        return {"message": "Payment not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on PaymentResource")
        payments_json = request.get_json()
        if payments_json["id"] is None:
            return {"message": "Invalid Payment"}, 400
        if id != payments_json["id"]:
            return {"message": "Invalid Payment"}, 400
        payments = Payment.find_by_id(id)
        if payments.get_id() is None:
            return {"message": "Invalid Payment"}, 400
        try:
            updated_payments = payments_schema.load(payments_json, instance=payments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_payments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return payments_schema.dump(updated_payments), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on PaymentResource")
        payments_json = request.get_json()
        if payments_json["id"] is None:
            return {"message": "Invalid Payment"}, 400
        if id != payments_json["id"]:
            return {"message": "Invalid Payment"}, 400
        payments = Payment.find_by_id(id)
        if payments.get_id() is None:
            return {"message": "Invalid Payment"}, 400
        try:
            updated_payments = payments_schema.load(payments_json, instance=payments, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_payments.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return payments_schema.dump(updated_payments), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on PaymentResource")
        payments = Payment.find_by_id(id)
        if payments is None:
            return {"message": "Payment not found"}, 404
        try:
            payments.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Payment deleted"}, 204


class PaymentResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on PaymentResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        payments = Payment.find_all(page, size)
        if payments is not None:
            return payments_list_schema.dump(payments), 200
        return {"message": "Payment not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on PaymentResourceList")
        payments_json = request.get_json()
        try:
            payments_data = payments_schema.load(payments_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            payments_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return payments_schema.dump(payments_data), 201


class PaymentResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on PaymentResourceListCount")
        payments_count = Payment.find_all_count()
        if payments_count is not None:
            return payments_count, 200
        return {"message": "Payment count not found"}, 404