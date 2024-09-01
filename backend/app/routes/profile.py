# File: ./backend/app/routes/profile.py
# Description: This is the Flask route file handling User Profile operations.
# Methods: 
#    [+] get_user(): Handles the GET and POST requests to fetch or update user profile details, calling the relevant methods in the User model.
#    [+] update_user(): Handles the update of user profile data using the User model's update method.

import logging
from flask import request, jsonify
from models.user import User
from flask import current_app as app
from flask import request, jsonify, session  # Add session to the import
from flask_login import login_user, logout_user, login_required, current_user, AnonymousUserMixin


@login_required
def get_user():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    
    # Correctly retrieve user_id from session
    user_id = session.get('user_id')
    session_id = session.get('session_id')
    print(f"Invalid user_id: {user_id} for session_id: {session_id}")
    if not user_id:
        logging.error(f"Invalid user_id: {user_id} for session_id: {session_id}")
        return jsonify({'message': 'Invalid session or user not found'}), 401

    logging.info(f'profile.py: Fetching user with user_id: {user_id}')
    user = User.get(user_id)
    
    if user:
        return jsonify(user.to_dict()), 200
    else:
        logging.error(f'User not found with user_id: {user_id}')
        return jsonify({'message': 'User not found'}), 404






def update_user():
    data = request.get_json()
    user_id = current_user.get_id()

    if user_id is None:
        return jsonify({'message': 'Invalid user_id'}), 400

    # Extract fields from the request data
    name = data.get('name')
    surname = data.get('surname')
    location = data.get('location')
    profile_picture = data.get('profile_picture')

    # Call the update method in User model
    updated_user = User.update(user_id, name=name, surname=surname, location=location, profile_picture=profile_picture)
    
    if updated_user:
        return jsonify(updated_user.to_dict()), 200
    else:
        return jsonify({'message': 'Failed to update user profile'}), 400

