# File: ./backend/app/routes/login.py
# Description: This file manages user authentication and session management for the TrustSphere platform.
#              It defines the routes for user login, logout, and session verification.
# Classes: None
# Properties: None
# Methods: 
#    [+] load_user(user_id): Retrieves a user by their user_id, used by Flask-Login for session management.
#    [+] login(): Handles the POST request for user login, verifies user credentials, creates a session, and sets the session cookie.
#    [+] logout(): Handles the POST request for user logout, clears the session cookie, and removes the session from the database.
#    [+] check_session(): Handles GET and POST requests to verify if a session is active or inactive.
#    [+] is_valid_uuid(uuid_to_test, version=4): Utility function to validate if a string is a valid UUID of a specified version.


from flask import request, jsonify, session, make_response, current_app
from flask_login import login_user, logout_user, current_user
import logging
import uuid
from datetime import datetime, timedelta
from models.user import User
from routes.cassandra import CassandraSessionInterface  # Correct import

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize the custom session interface globally if required
cassandra_session_interface = CassandraSessionInterface(cluster_nodes=['143.42.34.42'], keyspace='trustsphere', session_lifetime=timedelta(hours=24))

def load_user(user_id):
    logger.info(f'Loading user with user_id: {user_id}')
    return User.get(user_id)

def login():
    if request.method == 'OPTIONS':
        logger.info("Handling OPTIONS request for login route")
        response = make_response('')
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, session_id')
        response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        logger.debug(f"Response headers for OPTIONS: {response.headers}")
        return response, 200

    try:
        data = request.get_json()
        logger.debug(f'Login data received: {data}')
        user = User.login(data)
        if user:
            # Generate or retrieve the session ID
            session_id = user.session_id or str(uuid.uuid4())
            session['session_id'] = session_id
            user.session_id = session_id

            # Set session data
            session['user_email'] = user.email
            session['user_id'] = str(user.user_id)  # Ensure user_id is a string

            response = make_response(jsonify({'message': 'User logged in successfully', 'data': user.to_dict()}))

            # Save the session
            cassandra_session_interface.save_session(current_app, session, response)

            logger.debug(f'Session ID set in cookie: {session_id}')
            logger.debug(f"Response headers: {response.headers}")
            response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            return response, 200
        else:
            logger.error('Invalid email or password')
            response = jsonify({'message': 'Invalid email or password'})
            response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            return response, 401
    except Exception as e:
        logger.error(f'Error during login: {e}')
        response = jsonify({'error': 'Login failed due to an internal error'})
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 500


def logout():
    if request.method == 'OPTIONS':
        response = make_response('')
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,session_id')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        logger.info("Handling OPTIONS request for logout route")
        return response, 200
    else:
        try:
            session_id = request.cookies.get('session_id')
            logger.info(f'Retrieved session_id from cookie: {session_id}')

            if not session_id or not is_valid_uuid(session_id):
                logger.error(f'Invalid session_id retrieved from cookie: {session_id}')
                response = jsonify({'error': 'Invalid session_id'})
                response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                return response, 400

            # Call the logout function to delete the session from the database
            User.logout(session_id)
            logout_user()

            # Clear the session cookie and remove session data
            response = jsonify(success=True)
            response.set_cookie('session_id', '', expires=0, path='/')
            session.clear()  # Clear the session data
            
            logger.info(f'Session deleted and user logged out with session_id: {session_id}')
            response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            return response, 200
        except Exception as e:
            logger.error(f'Error during logout: {e}')
            response = jsonify({'error': 'Logout failed due to an internal error'})
            response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            return response, 500




def check_session():
    if request.method == 'OPTIONS':
        response = make_response('')
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,session_id')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        logger.info("Handling OPTIONS request for check_session route")
        return response, 200
    else:
        try:
            session_id = request.cookies.get('session_id')
            logger.info(f'Checking session for session_id: {session_id}')

            if not session_id or not is_valid_uuid(session_id):
                logger.info(f'No valid session_id found, or session_id is invalid: {session_id}')
                response = jsonify({'status': 'inactive', 'user_id': None})
                response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                return response, 200  # Return 200 even if the session is inactive

            user_id = User.check_session(session_id)
            if user_id:
                user = User.get(user_id)  # Load the user details using user_id
                response = jsonify({'status': 'active', 'user_id': user.get_id() if user else None})
                response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                logger.info(f'Session is active for session_id: {session_id}, user_id: {user.get_id() if user else None}')
                return response, 200
            else:
                response = jsonify({'status': 'inactive', 'user_id': None})
                response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                logger.info(f'Session is inactive or not found for session_id: {session_id}')
                return response, 200  # Return 200 even if the session is inactive
        except Exception as e:
            logger.error(f'Error during session check: {e}')
            response = jsonify({'error': 'Session check failed due to an internal error'})
            response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            return response, 500






def is_valid_uuid(uuid_to_test, version=4):
    try:
        uuid_obj = uuid.UUID(uuid_to_test, version=version)
    except ValueError:
        return False
    return str(uuid_obj) == uuid_to_test
