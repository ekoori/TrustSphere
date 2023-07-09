#profile.py

from flask import request, jsonify
from models.user import User
from flask import current_app as app

from flask_login import login_user, logout_user, login_required, current_user, AnonymousUserMixin


def get_user():

    """     if isinstance(current_user, AnonymousUserMixin):
        return {'message': 'No user found for this session ID'}, 404
    print(jsonify(current_user.to_dict()))
    return jsonify(current_user.to_dict())  # Return the user data as JSON """

    # Get the session_id from the headers
    session_id = request.headers.get('Session-ID')


    if session_id is None:
        return {'message': 'No session ID provided'}, 400

    # Use the session_id to get the user
    
    user = User.get_user_by_session(session_id)
    
    print('profile: ', user)
    if user is None:
        return {'message': 'No user found for this session ID'}, 404


    return jsonify(user)