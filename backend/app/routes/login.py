"""
File: ./backend/app/routes/login.py
Description: This is the Flask route file handling User Login operations.
Methods: 
	[x] authenticate_user() : Handles POST request for '/login' route. Verifies user credentials, logs in the user, and sets up the user session.
	[x] log_out_user() : Handles POST request for '/logout' route. Deauthenticates the user and ends the user session.
	[x] get_logged_in_user() : Handles GET request to attain information about the currently logged-in user.
"""


from flask import Flask, request, jsonify
from flask_cors import CORS
from models.user import User
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import check_password_hash
from flask import current_app as app

def load_user(user_id):
    #gets user for Flask LoginManager
    return User.get(user_id)

def login():
    if request.method == 'OPTIONS':
        # This is a preflight request. Reply successfully:
        response = app.make_default_options_response()
        # Allow CORS for the actual request:
        response.headers.add('Access-Control-Allow-Origin', 'http://143.42.34.42:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        print("debug>>> in login route - options")
        return response, 200
        
    else:
        data = request.get_json()
        user = User.login(data)  #model:user
        print("debug>>> in login route - get")
        #print("login.py data: ", user.to_dict())
        print('login.py.login: ', user.session_id)
        if user:
            login_user(user)
            return {'message': 'User logged in successfully', 'data': user.to_dict()}, 200
        else:
            return {'message': 'Invalid email or password'}, 401

def logout():
    if request.method == 'OPTIONS':
        # This is a preflight request. Reply successfully:
        response = app.make_default_options_response()
        #data = request.get_json()
        return response, 200
    else:
        data = request.get_json()
        session_id = data['session_id']
        User.logout(session_id)
        return jsonify(success=True), 200


#@app.route('/api/check_session', methods=['GET'])
@login_required
def check_session():
    return jsonify({"status": "active", "user_id": current_user.id}), 200

"""
def check_session(): 
    data = request.get_json()
    print(data)
    session_id = data['session_id']
    result = User.check_session(session_id) #model:user
    return {'isLoggedIn': result}
"""

