from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.LearningMaterial import LearningMaterial
from schema.LearningMaterialSchema import LearningMaterialSchema
from flask_login import login_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
learning_materials_list_ns = Namespace('learning-materials-resource', path="/learning-materials")

learning_materials_schema = LearningMaterialSchema()
learning_materials_list_schema = LearningMaterialSchema(many=True)


class LearningMaterialResource(Resource):
    @login_required
    def get(self, id):
        logging.info("GET request received on LearningMaterialResource")
        learning_materials = LearningMaterial.find_by_id(id)
        if learning_materials is not None:
            return learning_materials_schema.dump(learning_materials), 200
        return {"message": "LearningMaterial not found"}, 404

    @login_required
    def put(self, id):
        logging.info("PUT request received on LearningMaterialResource")
        learning_materials_json = request.get_json()
        if learning_materials_json["id"] is None:
            return {"message": "Invalid LearningMaterial"}, 400
        if id != learning_materials_json["id"]:
            return {"message": "Invalid LearningMaterial"}, 400
        learning_materials = LearningMaterial.find_by_id(id)
        if learning_materials.get_id() is None:
            return {"message": "Invalid LearningMaterial"}, 400
        try:
            updated_learning_materials = learning_materials_schema.load(learning_materials_json, instance=learning_materials, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_learning_materials.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return learning_materials_schema.dump(updated_learning_materials), 200
    
    @login_required
    def patch(self, id):
        logging.info("PATCH request received on LearningMaterialResource")
        learning_materials_json = request.get_json()
        if learning_materials_json["id"] is None:
            return {"message": "Invalid LearningMaterial"}, 400
        if id != learning_materials_json["id"]:
            return {"message": "Invalid LearningMaterial"}, 400
        learning_materials = LearningMaterial.find_by_id(id)
        if learning_materials.get_id() is None:
            return {"message": "Invalid LearningMaterial"}, 400
        try:
            updated_learning_materials = learning_materials_schema.load(learning_materials_json, instance=learning_materials, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_learning_materials.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return learning_materials_schema.dump(updated_learning_materials), 200

    @login_required
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on LearningMaterialResource")
        learning_materials = LearningMaterial.find_by_id(id)
        if learning_materials is None:
            return {"message": "LearningMaterial not found"}, 404
        try:
            learning_materials.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "LearningMaterial deleted"}, 204


class LearningMaterialResourceList(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on LearningMaterialResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        learning_materials = LearningMaterial.find_all(page, size)
        if learning_materials is not None:
            return learning_materials_list_schema.dump(learning_materials), 200
        return {"message": "LearningMaterial not found"}, 404

    @login_required
    def post(self):
        logging.info("POST request received on LearningMaterialResourceList")
        learning_materials_json = request.get_json()
        try:
            learning_materials_data = learning_materials_schema.load(learning_materials_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            learning_materials_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return learning_materials_schema.dump(learning_materials_data), 201


class LearningMaterialResourceListCount(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on LearningMaterialResourceListCount")
        learning_materials_count = LearningMaterial.find_all_count()
        if learning_materials_count is not None:
            return learning_materials_count, 200
        return {"message": "LearningMaterial count not found"}, 404