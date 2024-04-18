"""
File: ./backend/app/routes/profile.py
Description: This is the Flask route file handling User Profile operations.
Methods: 

"""


from flask import request, jsonify
from models.user import User
from flask import current_app as app

from flask_login import login_user, logout_user, login_required, current_user, AnonymousUserMixin


def get_user():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://143.42.34.42:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response, 200
    else:
        data = request.get_json()
        session_id = data.get('session_id')
        user_id = data.get('user_id')
        print ("profile.py: user_id: ", user_id)
        user = User.get_user_by_session(session_id, user_id)
        if user:
            return user.to_dict(), 200
        else:
            return {'message': 'User not found'}, 404
