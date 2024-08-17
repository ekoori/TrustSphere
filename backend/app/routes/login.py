# File: ./backend/app/routes/login.py
# Description: This is the Flask route file handling User Login operations.
# Methods: 
#    [+] authenticate_user() : Handles POST request for '/login' route. Verifies user credentials, logs in the user, and sets up the user session.
#    [+] log_out_user() : Handles POST request for '/logout' route. Deauthenticates the user and ends the user session.
#    [+] get_logged_in_user() : Handles GET request to attain information about the currently logged-in user.

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

    # Handle the actual login (POST) request
    try:
        data = request.get_json()
        logger.debug(f'Login data received: {data}')
        user = User.login(data)
        if user:
            # Retrieve the existing session ID from the session object
            session_id = session.get('session_id')
            
            if not session_id:
                # Generate a session ID only if it doesn't already exist
                session_id = user.session_id or str(uuid.uuid4())
                session['session_id'] = session_id
            
            user.session_id = session_id

            response = make_response(jsonify({'message': 'User logged in successfully', 'data': user.to_dict()}))

            # Set session data
            session['user_email'] = user.email
            session['user_id'] = user.user_id

            # Save session using the globally defined `cassandra_session_interface`
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
            data = request.get_json()
            session_id = data.get('session_id')
            logger.info(f'Received session_id: {session_id}')

            if not session_id or not is_valid_uuid(session_id):
                logger.error(f'Invalid session_id: {session_id}')
                response = jsonify({'error': 'Invalid session_id'})
                response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                return response, 400

            User.logout(session_id)
            logout_user()
            response = jsonify(success=True)
            response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            logger.info(f'User logged out with session_id: {session_id}')
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
            session_id = request.headers.get('session_id')
            logger.info(f'Checking session for session_id: {session_id}')

            if not session_id or not is_valid_uuid(session_id):
                logger.error(f'Invalid session_id: {session_id}')
                response = jsonify({'status': 'inactive'})
                response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                return response, 401

            if User.check_session(session_id):
                response = jsonify({'status': 'active', 'user_id': current_user.get_id()})
                response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                logger.info(f'Session is active for session_id: {session_id}')
                return response, 200
            else:
                response = jsonify({'status': 'inactive'})
                response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                logger.error(f'Session is inactive for session_id: {session_id}')
                return response, 401
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
