from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Certification import Certification
from schema.CertificationSchema import CertificationSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
certifications_list_ns = Namespace('certifications-resource', path="/certifications")

certifications_schema = CertificationSchema()
certifications_list_schema = CertificationSchema(many=True)


class CertificationResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on CertificationResource")
        certifications = Certification.find_by_id(id)
        if certifications is not None:
            return certifications_schema.dump(certifications), 200
        return {"message": "Certification not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on CertificationResource")
        certifications_json = request.get_json()
        if certifications_json["id"] is None:
            return {"message": "Invalid Certification"}, 400
        if id != certifications_json["id"]:
            return {"message": "Invalid Certification"}, 400
        certifications = Certification.find_by_id(id)
        if certifications.get_id() is None:
            return {"message": "Invalid Certification"}, 400
        try:
            updated_certifications = certifications_schema.load(certifications_json, instance=certifications, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_certifications.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return certifications_schema.dump(updated_certifications), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on CertificationResource")
        certifications_json = request.get_json()
        if certifications_json["id"] is None:
            return {"message": "Invalid Certification"}, 400
        if id != certifications_json["id"]:
            return {"message": "Invalid Certification"}, 400
        certifications = Certification.find_by_id(id)
        if certifications.get_id() is None:
            return {"message": "Invalid Certification"}, 400
        try:
            updated_certifications = certifications_schema.load(certifications_json, instance=certifications, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_certifications.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return certifications_schema.dump(updated_certifications), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on CertificationResource")
        certifications = Certification.find_by_id(id)
        if certifications is None:
            return {"message": "Certification not found"}, 404
        try:
            certifications.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Certification deleted"}, 204


class CertificationResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on CertificationResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        certifications = Certification.find_all(page, size)
        if certifications is not None:
            return certifications_list_schema.dump(certifications), 200
        return {"message": "Certification not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on CertificationResourceList")
        certifications_json = request.get_json()
        try:
            certifications_data = certifications_schema.load(certifications_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            certifications_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return certifications_schema.dump(certifications_data), 201


class CertificationResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on CertificationResourceListCount")
        certifications_count = Certification.find_all_count()
        if certifications_count is not None:
            return certifications_count, 200
        return {"message": "Certification count not found"}, 404