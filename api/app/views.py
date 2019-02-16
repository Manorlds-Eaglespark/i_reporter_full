import os
import re
from flask import Flask, request, jsonify, make_response, json
from datetime import datetime
from instance.config import app_config
from app.data_store.data import incidents
from app.utilities.helper_functions import Helper_Functions
from app.utilities.incident_validation import Incident_Validation
from app.models.user import User
from app.mail import Mail
from os.path import join, dirname
from dotenv import load_dotenv
from app.utilities.login_required import login_required, admin_required
from app.utilities.register_validation import Register_Validation
from app.utilities.login_validation import Login_Validation
from flask_cors import CORS, cross_origin


def create_app(config_name):

    from app.models.incident import Incident
    from app.models.user import User
    from app.databases.database import Database

    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    CORS(app)
    

    database = Database()

    @app.route('/', methods=['GET'])
    def welcome_to_api():
        response = {"status": 200, "data": [{
            "message": "Welcome To iReporter API. Consume Using Endpoints Given Here.",
                                            "endpoint 1": "GET     /api/v1/red-flags",
                                            "endpoint 2": "GET     /api/v1/red-flags/<red-flag-id>",
                                            "endpoint 3": "POST    /api/v1/red-flags",
                                            "endpoint 4": "PATCH   /api/v1/red-flags/<red-flag-id>/location",
                                            "endpoint 5": "PATCH   /api/v1/red-flags/<red-flag-id>/comment",
                                            "endpoint 6": "DELETE  /red-flags/<red-flag-id>"}]}
        return make_response(jsonify(response)), 200

    @app.route('/api/v2/red-flags', methods=['GET'])
    # @login_required
    def get_redflags(current_user=1):
        data = database.get_all_red_flags()
        if len(data) > 0:
            return make_response(jsonify({"status": 200, "redflags": Helper_Functions.get_dict_incidents(data)})), 200
        else:
            return Helper_Functions.the_return_method(404, "No resource added yet.")
         
    @app.route('/api/v2/red-flags/<red_flag_id>', methods=['GET'])
    # @login_required
    def get_a_redflag( red_flag_id, current_user=1):
        data = database.get_incident_by_id(red_flag_id, "red_flag")
        if data:
            return make_response(
                jsonify({"status": 200, "data": Incident.convert_to_dictionary(data)})), 200
        else:
            return Helper_Functions.the_return_method(404, "Resource not found.")
            

    @app.route('/api/v2/red-flags', methods=['POST']) 
    # @login_required
    def create_redflag(current_user = 1):
        input_data = json.loads(request.data)
        created_by = current_user
        doc_type = 'red_flag'
        location = input_data['location']
        status = 'New'
        images = input_data['images']
        videos = input_data['videos']
        comment = input_data['comment']
        input_list = [
                    created_by,
                    doc_type,
                    location,
                    status,
                    images,
                    videos,
                    comment
                ]

        validate_inputs = Incident_Validation(
                    Helper_Functions.get_dict_data_from_list_incident(input_list))
        validated_inputs = validate_inputs.check_types()
        duplicate_exists = database.get_like_this_in_database(
                    comment, created_by)
        if validated_inputs[0] == 200:
            if not duplicate_exists:
                red_flag = Incident(input_list)
                saved_incident = database.save_incident(red_flag)
                return make_response(jsonify({"status": 201, "data": Incident.convert_to_dictionary(saved_incident), "message": "Created red-flag record"}))
            else:
                return make_response(
                            jsonify({"status": 400, "error": "a similar resource already exists."}))
        else:
            return make_response(
                        jsonify({"status": validated_inputs[0], "error": validated_inputs[1]}))


    @app.route('/api/v2/red-flags/<red_flag_id>/location', methods=['PATCH'])
    @login_required
    def update_redflag_location(current_user, red_flag_id):
        location = json.loads(request.data)['location']
        data = database.update_location_of_incident(
                    red_flag_id, location, 'red_flag')
        if data:
            return make_response(jsonify({"status": 202, "data": Incident.convert_to_dictionary(data), "message":"Updated red-flag record’s location"})),202
        else:
            return make_response(
                        jsonify({"status": 404, "error": "Resource not found."}))
            
    @app.route('/api/v2/red-flags/<red_flag_id>/comment', methods=['PATCH'])
    @login_required
    def update_redflag_comment(current_user, red_flag_id):
        comment = json.loads(request.data)['comment']
        data = database.update_comment_of_incident(
                    red_flag_id, comment, 'red_flag')
        if data:
            return make_response(jsonify({"status": 202, "data": Incident.convert_to_dictionary(data), "message": "Updated red-flag record’s comment"})), 202
        else:
            return make_response(
                        jsonify({"status": 404, "error": "Resource not found."}))
            
    @app.route('/api/v2/red-flags/<red_flag_id>', methods=['DELETE'])
    @login_required
    def delete_redflag(current_user, red_flag_id):
        if database.get_incident_by_id(red_flag_id, 'red_flag'):
            database.delete_incident(red_flag_id, 'red_flag')
            return make_response(jsonify({"status": 200, "data": [
                                         {"id": red_flag_id, "message": "red-flag record has been deleted"}]}))
        else:
            return make_response(
                        jsonify({"status": 404, "error": "Resource not found."}))
        
    @app.route('/api/v2/red-flags/<red_flag_id>/status', methods=['PATCH'])
    @admin_required
    def update_redflag_status(current_user, red_flag_id):
        status = json.loads(request.data)['status']
        if database.get_incident_by_id(red_flag_id, 'red_flag'):
            data = database.update_status_of_incident(
                            red_flag_id, status, 'red_flag')
            return make_response(jsonify({"status": 200, "data": Incident.convert_to_dictionary(data), "message": "Updated red-flag record’s status"}))
        else:
            return make_response(
                            jsonify({"status": 404, "error": "Resource not found."}))
            
    @app.route('/api/v2/interventions', methods=['POST'])
    # @login_required
    def create_intervention_record(current_user=1):
        input_data = json.loads(request.data)
        created_by = current_user
        doc_type = 'intervention'
        location = input_data['location']
        status = 'New'
        images = input_data['images']
        videos = input_data['videos']
        comment = input_data['comment']
        input_list = [
                    created_by,
                    doc_type,
                    location,
                    status,
                    images,
                    videos,
                    comment
                ]

        validate_inputs = Incident_Validation(
                    Helper_Functions.get_dict_data_from_list_incident(input_list))

        validated_inputs = validate_inputs.check_types()
        duplicate_exists = database.get_like_this_in_database(
                    comment, created_by)
        if validated_inputs[0] == 200:
            if not duplicate_exists:
                saved_intervention = Incident(input_list)
                saved_incident = database.save_incident(saved_intervention)
                return make_response(jsonify({"status": 201, "data": Incident.convert_to_dictionary(saved_incident), "message": "Created Intervention record"})),201
            else:
                return make_response(
                            jsonify({"status": 400, "error": "a similar resource already exists."}))
        else:
            return make_response(
                        jsonify({"status": validated_inputs[0], "error": validated_inputs[1]}))
        
    @app.route('/api/v2/interventions', methods=['GET'])
    # @login_required
    def get_intervention_records(current_user=1):
        data = database.get_all_interventions()
        if len(data) > 0:
            return make_response(
                jsonify({"status": 200, "data": Helper_Functions.get_dict_incidents(data)})), 200
        else:
            return Helper_Functions.the_return_method(
                        404, "Sorry, no resource added yet.")
        
    @app.route('/api/v2/interventions/<intervention_id>', methods=['GET'])
    @login_required
    def get_an_intervention_record(current_user, intervention_id):
        data = database.get_incident_by_id(intervention_id, 'intervention')
        if data:
            return make_response(
                        jsonify({"status": 200, "data": [Incident.convert_to_dictionary(data)]})), 200
        else:
            return Helper_Functions.the_return_method(
                        404, "Resource not found.")
        
    @app.route('/api/v2/interventions/<intervention_id>/comment',
               methods=['PATCH'])
    @login_required
    def intervention_comment(current_user, intervention_id):
        comment = json.loads(request.data)['comment']
        data = database.update_comment_of_incident(
            intervention_id, comment, 'intervention')
        if data:
            return make_response(jsonify({"status": 200, "data":Incident.convert_to_dictionary(data), "message": "Updated intervention record’s comment"}))
        else:
            return make_response(
                        jsonify({"status": 404, "error": "Resource not found."}))

    @app.route('/api/v2/interventions/<intervention_id>/location', methods=['PATCH'])
    @login_required
    def update_intervention_location(current_user, intervention_id):
        location = json.loads(request.data)['location']
        data = database.update_location_of_incident(
            intervention_id, location, 'intervention')
        if data:
            return make_response(jsonify({"status": 202, "data": Incident.convert_to_dictionary(data), "message": "Updated Intervention record’s location"})), 202
        else:
            return make_response(
                jsonify({"status": 404, "error": "Resource not found."}))


    @app.route('/api/v2/interventions/<intervention_id>', methods=['DELETE'])
    @login_required 
    def delete_interventions(current_user, intervention_id):
        if database.get_incident_by_id(intervention_id, 'intervention'):
            database.delete_incident(intervention_id, 'intervention')
            return make_response(jsonify({"status": 200, "data": [
                                {"id": intervention_id, "message": "Intervention record has been deleted"}]}))
        else:
            return make_response(
                    jsonify({"status": 404, "error": "Resource not found."}))

    @app.route('/api/v2/interventions/<intervention_id>/status', methods=['PATCH'])
    @admin_required
    def update_intervention_status(current_user, intervention_id):
        status = json.loads(request.data)['status']
        if database.get_incident_by_id(intervention_id, 'intervention'):
            data = database.update_status_of_incident(
                intervention_id, status, 'intervention')
            return make_response(jsonify({"status": 200, "data": Incident.convert_to_dictionary(data), "message": "Updated red-flag record’s status"}))
        else:
            return make_response(
                jsonify({"status": 404, "error": "Resource not found."}))

    @app.route('/api/v2/auth/login', methods=['POST'])
    def login_user():
        input_data = json.loads(request.data)
        password = input_data['password']
        email = input_data['email']
        validate_input = Login_Validation(
            {"email": email, "password": password})
        validated_input = validate_input.check_inputs()
        database = Database()
        if validated_input[0] == 200:
            try:
                user_data = database.get_user_by_email(email)
                if user_data:
                    user_info = list(user_data)
                    user = User(user_info[1:])
                    user.password = user_info[5]
                    user_id = user_info[0]
                    if user.password_is_valid(password):

                        access_token = user.generate_token(
                            user_id, user.isadmin)
                        if access_token:
                            response = {
                                'status': 200,
                                'data': [{'access_token': access_token.decode()}]
                            }
                            return make_response(jsonify(response)), 200
                    else:
                        return Helper_Functions.the_return_method(
                            401, "Enter a correct Password")
                else:
                    return Helper_Functions.the_return_method(
                        401, "Email not registered on any account.")
            except Exception as e:
                response = {
                    'message': str(e)
                }
                return make_response(jsonify(response)), 500
        else:
            return Helper_Functions.the_return_method(
                validated_input[0], validated_input[1])
    
    @app.route('/api/v2/auth/register', methods=['POST'])
    def sign_up_user():
        input_data = json.loads(request.data)
        firstname = input_data['firstname']
        lastname = input_data['lastname']
        othernames = input_data['othernames']
        email = input_data['email']
        password = input_data['password']
        phonenumber = input_data['phonenumber']
        username = input_data['username']
        validate_input = Register_Validation(
            {"firstname": firstname, "lastname": lastname, "othernames": othernames, "email": email, "password": password, "phonenumber": phonenumber, "username": username})
        validated_input = validate_input.check_input()
        database = Database()

        if validated_input[0] == 200:
            if database.get_user_by_email(email):
                return Helper_Functions.the_return_method(
                    401, "That Email is already taken.")
            else:
                new_user_info_list = [
                    firstname,
                    lastname,
                    othernames,
                    email,
                    password,
                    phonenumber,
                    username,
                    "False"]
                new_user = User(new_user_info_list)

                user_data = database.save_user(new_user)
                return make_response(jsonify(
                    {"status": 201, "data": Helper_Functions.get_dict_user(user_data), "message": "Successfully registered"})), 201
        else:
            return Helper_Functions.the_return_method(
                validated_input[0], validated_input[1])


    return app
