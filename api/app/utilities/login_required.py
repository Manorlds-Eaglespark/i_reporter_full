import os
import jwt
from functools import wraps
from flask import request, jsonify
from app.models.user import User
from app.databases.database import Database
from app.utilities.helper_functions import Helper_Functions


def admin_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        access_token = get_token()
        if access_token:
            access_token = str(access_token).split(" ")[1]
            user_id = decode_token(access_token)
            database = Database()
            if isinstance(user_id, str):
                return Helper_Functions.the_return_method(401, user_id)
            current_user = User.convert_to_dictionary(database.get_user_by_id(user_id))
            admin = decode_admin_status(access_token)
            if admin == 'True':
                return f(current_user, *args, **kwargs)
            else:
                return Helper_Functions.the_return_method(403, "Access Not Granted.")
        else:
            return Helper_Functions.the_return_method(
                401, "A Resource Token is required. Sign-in or log-in")
    return wrap



def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        access_token = get_token()
        if access_token:
            database = Database()
            access_token = access_token.split()
            access_token = (access_token[1])
            user_id = decode_token(access_token)
            if isinstance(user_id, str):
                return Helper_Functions.the_return_method(401, user_id)
            user_data_list = database.get_user_by_id(user_id)
            current_user = User.convert_to_dictionary(user_data_list)
            return f(current_user, *args, **kwargs)
        else:
            return Helper_Functions.the_return_method(
                401, "A Resource Token is required. Sign-in or log-in")       
    return wrap



def get_token(): 
    auth_header = request.headers.get('Authorization')
    return auth_header

def decode_token(token):
        try:
            payload = jwt.decode(
                token, str(
                    os.getenv('SECRET')), algorithms='HS256')
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return "Expired token. Please login to get a new token"
        except jwt.InvalidTokenError:
            return "Invalid token. Please register or login"
        return None

def decode_admin_status(token):
    payload = jwt.decode(token, str(
        os.getenv('SECRET')), algorithms='HS256')
    return payload['adn']

