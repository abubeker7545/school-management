from flask import request, make_response
from flask_restx import Resource, Namespace
import logging
from flask_login import login_required, logout_user

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')

logout_ns = Namespace('user-session-controller', path="/logout")

class LogoutResource(Resource):
     # @login_required
     def post(self):
          logging.info("POST request received on LogoutResource")
          logout_user()
          # session.clear()
          response = make_response()
          response.delete_cookie('X-XSRF-TOKEN')
          response.delete_cookie('JSESSIONID')
          return response
