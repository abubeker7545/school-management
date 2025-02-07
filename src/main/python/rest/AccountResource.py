from flask_restx import Resource, Namespace
from flask import request
from domain.Authority import Authority
from domain.User import User
from schema.UserSchema import ManagedUserSchema, AdminUserSchema, KeyAndPasswordSchema
from security.AuthoritiesConstants import AuthoritiesConstants
import logging
import bcrypt
from datetime import datetime, timezone
import string
import secrets
from MailConfiguration import send_activation_mail, send_reset_mail, send_creation_mail
from flask_login import login_required, current_user as logged_in_user
from sqlalchemy.exc import SQLAlchemyError


logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')


def is_password_length_valid(password):
    if not password.strip() or len(password) < 4 or len(password) > 49:
        return False
    else:
        return True


def encrypt_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf8'), salt)
    return hashed_password


def generate_activation_reset_keys():
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(20))
    return password


account_register_ns = Namespace('account-resource', path="/register")

managed_user_schema = ManagedUserSchema()


class ManagedUserAccountRegister(Resource):
    def post(self):
        logging.info("POST request received on ManagedUserRegister")
        current_login = "system"
        managed_user = request.get_json()
        # Check that the username and email are not already used
        user_name = User.get_by_login(managed_user["login"])
        if user_name is not None:
            return {"message": "Username is already in use"}, 400
        user_email = User.get_by_email(managed_user["email"])
        if user_email is not None:
            return {"message": "Email is already in use"}, 400
        if not is_password_length_valid(managed_user["password"]):
            return {"message": "Invalid password length"}, 400
        # Salt the password and then encrypt it using bcrypt
        managed_user["password"] = encrypt_password(managed_user["password"]).decode('utf-8')
        # Newly registered users should get a ROLE_USER role by default
        new_user = User()
        user_role = Authority().get_by_name(AuthoritiesConstants.USER)
        new_user.roles.append(user_role)
        try:
            managed_user_data = managed_user_schema.load(managed_user, instance=new_user)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        # Add activation key, created date, created by login to the entry and add it
        if managed_user_data.login is None:
            return {"message": "Unable to register"}, 400
        reset_key = generate_activation_reset_keys()
        managed_user_data.set_reset_key(reset_key)
        managed_user_data.set_created_date(datetime.now(timezone.utc))
        managed_user_data.set_created_by(current_login)
        # The user record is inserted into the database
        try:
            managed_user_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        # Send registration mail
        try:
            send_creation_mail(managed_user_data)
        except:
            return {"message": "User is created but unable to send mail"}, 200
        return {"message": "Successfully registered"}, 201


account_ns = Namespace('account-resource', path="/account")

admin_user_schema = AdminUserSchema()


class AdminAccountDetails(Resource):
    @login_required
    def post(self):
        logging.info("POST request received on AdminAccountDetails")
        login = logged_in_user.login
        user_json = request.get_json()
        if user_json["id"] is None:
            return {"message": "No User found"}, 400
        current_user = User.get_by_login(login)
        if current_user is None:
            return {"message": "User not found"}, 404
        if current_user.id != user_json["id"]:
            return {"message": "Invalid User"}, 400
        # Before updating check that the email is not already used by any other user
        user_email = User.get_by_email(user_json["email"])
        if user_email is not None:
            if user_email.id != user_json["id"]:
                return {"message": "Email is already in use"}, 400
        # TODO: Should update only first name, last name, email, language
        try:
            updated_user = admin_user_schema.load(user_json, instance=current_user)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        updated_user.set_last_modified_by(login)
        updated_user.set_last_modified_date(datetime.now(timezone.utc))
        try:
            updated_user.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return admin_user_schema.dump(updated_user), 200


    def get(self):
        logging.info("GET request received on AdminAccountDetails")
        login = None
        if logged_in_user.is_authenticated:
            login = logged_in_user.login
        if login is None:

            # anon_user = User(login='anonymous', roles=[AuthoritiesConstants.ANONYMOUS])
            # return admin_user_schema.dump(anon_user), 200
            return {}, 200

        current_user = User.get_by_login(login)
        if current_user is None:
            return {"message": "User could not be found"}, 500
        return admin_user_schema.dump(current_user), 200


account_authenticate_ns = Namespace('account-resource', path="/authentication")


class AccountAuthenticate(Resource):
    @login_required
    def get(self):
        logging.info("GET request received on AccountAuthenticate")
        login = logged_in_user.login
        if login is None:
            return {"message": "No authenticated User not found"}, 404
        return login, 200


account_activate_ns = Namespace('account-resource', path="/activate")


class AccountActivate(Resource):
    def get(self):
        logging.info("GET request received on AccountActivate")
        activation_key = request.args.get("key")
        # Get authentication key and search for user with that key
        user_data = User.get_by_activation_key(activation_key)
        if user_data is None:
            return {"message": "No User found for given activation key"}, 400
        # Mark the user as active
        user_data.set_activated(True)
        user_data.set_activation_key(None)
        user_data.set_last_modified_by(user_data.login)
        user_data.set_last_modified_date(datetime.now(timezone.utc))
        try:
            user_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        # Send mail
        try:
            send_activation_mail(user_data)
        except:
            return {"message": "User is activated but unable to send mail"}, 400
        return {"message": "Account activated"}, 200


passwd_reset_init_ns = Namespace('account-resource', path="/account/reset-password/init")


class AccountPasswordResetInit(Resource):
    def post(self):
        logging.info("POST request received on AccountPasswordResetInit")
        password_reset_mail = request.get_data().decode('utf-8')
        print(password_reset_mail)
        user = User.get_by_email(password_reset_mail)
        if user is None:
            logging.info("No user found for the supplied email address: " + password_reset_mail)
            return {"message": "No user found for this email address"}, 400
        reset_key = generate_activation_reset_keys()
        user.set_reset_key(reset_key)
        user.set_reset_date(datetime.now(timezone.utc))
        try:
            user.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        # Send account password reset mail with reset key
        try:
            send_reset_mail(user)
        except:
            return {"message": "Password reset request initiated but unable to send mail"}, 400
        return {"message": "Password reset request submitted"}, 200


passwd_reset_finish_ns = Namespace('account-resource', path="/account/reset-password/finish")
key_password_schema = KeyAndPasswordSchema()


class AccountPasswordResetFinish(Resource):
    def post(self):
        logging.info("POST request received on AccountPasswordResetFinish")
        password_reset_finish = request.get_json()
        if not is_password_length_valid(password_reset_finish["newPassword"]):
            return {"message": "Invalid password length"}, 400
        user = User.get_by_reset_key(password_reset_finish["key"])
        if user is None:
            return {"message": "No User found for given reset key"}, 400
        # Salt and encrypt the password
        new_password = encrypt_password(password_reset_finish["newPassword"]).decode('utf-8')
        user.set_reset_key(None)
        user.set_reset_date(None)
        user.set_activated(True)
        user.set_password(new_password)
        user.set_last_modified_by(user.login)
        user.set_last_modified_date(datetime.now(timezone.utc))
        try:
            user.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Password reset successful"}, 200


change_passwd_ns = Namespace('account-resource', path="/account/change-password")


class AccountChangePassword(Resource):
    @login_required
    def post(self):
        logging.info("POST request received on AccountChangePassword")
        login = logged_in_user.login
        current_user = User.get_by_login(login)
        if current_user is None:
            return {"message": "Current logged in User not found"}, 404
        password_reset_finish = request.get_json()
        old_password = password_reset_finish["currentPassword"]
        new_password = password_reset_finish["newPassword"]
        if not is_password_length_valid(new_password):
            return {"message": "Invalid password length"}, 400
        # Check the existing password
        if bcrypt.checkpw(old_password.encode('utf8'), current_user.password_hash.encode('utf8')) is not True:
            return {"message": "Invalid existing password supplied"}, 401
        # Salt and encrypt the password before storing
        new_password = encrypt_password(new_password).decode('utf-8')
        current_user.set_password(new_password)
        current_user.set_last_modified_by(current_user.login)
        current_user.set_last_modified_date(datetime.now(timezone.utc))
        try:
            current_user.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        return {"message": "Password reset successfully"}, 200
