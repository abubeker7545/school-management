from flask_restx import Namespace, Resource
import logging
from flask import request, session, make_response
from domain.User import User
import bcrypt
from datetime import timedelta, datetime
from sqlalchemy.exc import SQLAlchemyError
from flask_login import login_user, current_user


logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')


session_authentication_ns = Namespace('user-session-controller', path="/authentication")


class UserSessionResource(Resource):
    def post(self):
        logging.info("GET request received on UserSessionResource")
        username = request.form.get("username", None)
        password = request.form.get("password", None)
        remember_me = request.form.get("rememberMe", False)
        # Check if any of the inputs is empty
        if username is None or password is None:
            return {"message": "Username and/or password cannot be empty"}, 400
        # Check if user exists
        try:
            user = User.get_by_login(username)
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        if not user:
            return {"message": "Invalid user name"}, 404
        if bcrypt.checkpw(password.encode('utf8'), user.password_hash.encode('utf8')) is not True:
            return {"message": "Invalid user name and/or password"}, 401
        if not user.get_activated():
            return {"message": "User is not active. Please contact your administrator."}, 500
        token_expiry = timedelta(hours=3)
        if remember_me:
            token_expiry = timedelta(hours=24)
        login_user(user, remember=remember_me, duration=token_expiry)
        # Generate the session based on the above parameters
        csrf = request.cookies.get('XSRF-TOKEN')
        if csrf is None:
            csrf = session['_id']
        response = make_response('')
        if remember_me:
            response.set_cookie('X-XSRF-TOKEN', bytes(csrf, 'utf-8'), expires=(datetime.now() + timedelta(hours=24)))
            response.set_cookie('JSESSIONID', bytes(csrf, 'utf-8'), expires=(datetime.now() + timedelta(hours=24)))
        else:
            response.set_cookie('X-XSRF-TOKEN', bytes(csrf, 'utf-8'), expires=(datetime.now() + timedelta(hours=3)))
            response.set_cookie('JSESSIONID', bytes(csrf, 'utf-8'), expires=(datetime.now() + timedelta(hours=3)))
        response.status_code = 200
        return response
