from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Invoice import Invoice
from schema.InvoiceSchema import InvoiceSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
invoices_list_ns = Namespace('invoices-resource', path="/invoices")

invoices_schema = InvoiceSchema()
invoices_list_schema = InvoiceSchema(many=True)


class InvoiceResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on InvoiceResource")
        invoices = Invoice.find_by_id(id)
        if invoices is not None:
            return invoices_schema.dump(invoices), 200
        return {"message": "Invoice not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on InvoiceResource")
        invoices_json = request.get_json()
        if invoices_json["id"] is None:
            return {"message": "Invalid Invoice"}, 400
        if id != invoices_json["id"]:
            return {"message": "Invalid Invoice"}, 400
        invoices = Invoice.find_by_id(id)
        if invoices.get_id() is None:
            return {"message": "Invalid Invoice"}, 400
        try:
            updated_invoices = invoices_schema.load(invoices_json, instance=invoices, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_invoices.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return invoices_schema.dump(updated_invoices), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on InvoiceResource")
        invoices_json = request.get_json()
        if invoices_json["id"] is None:
            return {"message": "Invalid Invoice"}, 400
        if id != invoices_json["id"]:
            return {"message": "Invalid Invoice"}, 400
        invoices = Invoice.find_by_id(id)
        if invoices.get_id() is None:
            return {"message": "Invalid Invoice"}, 400
        try:
            updated_invoices = invoices_schema.load(invoices_json, instance=invoices, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_invoices.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return invoices_schema.dump(updated_invoices), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on InvoiceResource")
        invoices = Invoice.find_by_id(id)
        if invoices is None:
            return {"message": "Invoice not found"}, 404
        try:
            invoices.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Invoice deleted"}, 204


class InvoiceResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on InvoiceResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        invoices = Invoice.find_all(page, size)
        if invoices is not None:
            return invoices_list_schema.dump(invoices), 200
        return {"message": "Invoice not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on InvoiceResourceList")
        invoices_json = request.get_json()
        try:
            invoices_data = invoices_schema.load(invoices_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            invoices_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return invoices_schema.dump(invoices_data), 201


class InvoiceResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on InvoiceResourceListCount")
        invoices_count = Invoice.find_all_count()
        if invoices_count is not None:
            return invoices_count, 200
        return {"message": "Invoice count not found"}, 404