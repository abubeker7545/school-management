from flask import current_app
from flask_restx import Resource, Namespace
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
import logging, os


logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')


app_management_ns = Namespace('management', path="/management")


class AppManagementInfoResource(Resource):
    def get(self):
        return {
            "display-ribbon-on-profiles": "dev",
            "activeProfiles": ["dev", "api-docs"],
        }, 200

class AppManagementConfigurationResource(Resource):
    @has_role(AuthoritiesConstants.ADMIN)
    def get(self):
        flask_config = current_app.config
        config_vars = (
            "ENV", 
            "SQLALCHEMY_DATABASE_URI",
            "SQLALCHEMY_TRACK_MODIFICATIONS",
            "PROPAGATE_EXCEPTIONS",
            "SQLALCHEMY_EXPIRE_ON_COMMIT",
            "MAIL_SERVER",
            "MAIL_PORT",
            "MAIL_USERNAME",
            "MAIL_USE_TLS",
            "MAIL_USE_SSL",
        )
        flask_config_variables = {}
        flask_config_variables["contexts"] = {}
        flask_config_variables["contexts"]["alimran_student_managment"] = {}
        flask_config_variables["contexts"]["alimran_student_managment"]["beans"] = {}
        for var in config_vars:
            config_dict = {"prefix": var, "properties": {var: str(flask_config[var])}}
            flask_config_variables["contexts"]["alimran_student_managment"]["beans"][var] = config_dict
        return flask_config_variables, 200


class AppManagementEnvironmentResource(Resource):
    @has_role(AuthoritiesConstants.ADMIN)
    def get(self):
        env_variables = []
        for k, v in os.environ.items():
            # env_variables[k] = v
            env_property_dict = { "name": str(k), "properties": {str(k): {"value": str(v) }}}
            env_variables.append(env_property_dict)
        return { 
            "activeProfiles": ["dev", "api-docs"],
            "propertySources": env_variables 
        }, 200

class AppManagementOpenAPIResource(Resource):
    @has_role(AuthoritiesConstants.ADMIN)
    def get(self):
        return [ {
            "description" : "AlimranStudentManagmentApp Application (default)",
            "group" : "default"
            }
        ], 200
