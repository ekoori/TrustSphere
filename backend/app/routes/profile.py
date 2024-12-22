# File: ./backend/app/routes/profile.py
# Description: This is the Flask route file handling User Profile operations.
# Methods: 
#    [+] get_user(): Handles the GET and POST requests to fetch or update user profile details, calling the relevant methods in the User model.
#    [+] update_user(): Handles the update of user profile data using the User model's update method.

import logging
from flask import request, jsonify, current_app as app
from app.models.user import User
from app.middleware.session_middleware import validate_session

logger = logging.getLogger(__name__)

@validate_session
def get_user(user_id=None):
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        return response, 200

    try:
        logger.info(f"Fetching user data for user_id: {user_id}")
        
        # Get user data
        user = User.get(user_id)
        if user:
            user_data = user.to_dict()
            logger.info(f"Successfully retrieved user data for user_id: {user_id}")
            
            response = jsonify(user_data)
            return response, 200
        else:
            logger.error(f'User not found with user_id: {user_id}')
            response = jsonify({'message': 'User not found'})
            return response, 404

    except Exception as e:
        logger.error(f"Error in get_user: {str(e)}")
        response = jsonify({'message': 'Internal server error'})
        return response, 500

@validate_session
def update_user(user_id=None):
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        return response, 200

    try:
        data = request.get_json()
        logger.debug(f"Received update data: {data}")
        if not data:
            logger.error("No data provided for update")
            response = jsonify({'message': 'No data provided'})
            return response, 400

        logger.info(f"Updating user profile for user_id: {user_id}")
        
        # Extract fields from the request data
        name = data.get('name')
        surname = data.get('surname')
        location = data.get('location')
        profile_picture = data.get('profile_picture')

        # Update user profile
        updated_user = User.update(
            str(user_id),
            name=name,
            surname=surname,
            location=location,
            profile_picture=profile_picture
        )
        
        if updated_user:
            logger.info(f"Successfully updated profile for user_id: {user_id}")
            response = jsonify(updated_user.to_dict())
            return response, 200
        else:
            logger.error(f"Failed to update profile for user_id: {user_id}")
            response = jsonify({'message': 'Failed to update user profile'})
            return response, 400

    except Exception as e:
        logger.error(f"Error in update_user: {str(e)}")
        response = jsonify({'message': 'Internal server error'})
        return response, 500