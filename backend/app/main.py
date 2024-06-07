"""
File: ./backend/app/main.py:
Description: This file is the main entry point of the backend Flask application. It sets up and configures the Flask app, initializes LoginManager, configures CORS, defines route handlers and starts the server.
Class: None
Properties: None
Methods: 
	[+] load_user(user_id): Fetches the user with the given user_id from the User model, used by Flask-Login to manage user sessions.
	[+] login(): Handles the POST request for user login, invokes the login() method from the User model, and starts a new user session.
	[+] logout(): Handles the POST request for user logout, invokes the logout() method from the User model, and ends the current user session.
	[+] check_session(): Checks the validity of a session.
	[+] get_user(): Handles the GET request to fetch user profile details, it calls the get() method from the User model.
	[+] register(): Handles the POST request for new user registration, it calls the register() method from the User model.
	[x] app.run(): The application is not currently configured to run inside a WSGI container. It can be started using this method in a development environment.
"""

from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_session import Session
from routes.login import load_user, login, logout, check_session
from routes.profile import get_user
from routes.registration import register

from models.user import User

import sys
print("Python executable:", sys.executable)


app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'  # Add your secret key
app.config['SESSION_TYPE'] = 'filesystem'  
Session(app)

from routes.trusttrail import get_trusttrail, add_transaction

CORS(app, resources={r"/api/*": {
     "origins": ["*"],
     #"origins": ["http://143.42.34.42:3000","http://localhost:3000"],
     "allow_headers": ["Content-Type"],
     "supports_credentials": True
    }})  # Enable CORS for all routes

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.user_loader(load_user) #checks existing session

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

#route:login
app.add_url_rule('/api/login', view_func=login, methods=['POST', 'OPTIONS'])
app.add_url_rule('/api/logout', view_func=logout, methods=['POST', 'OPTIONS'])
app.add_url_rule('/api/check_session', view_func=check_session, methods=['POST','GET'])

#route:profile
app.add_url_rule('/api/user', view_func=get_user, methods=['GET','POST'])

#route:registration
app.add_url_rule('/api/register', view_func=register, methods=['POST'])

#route:trusttrail
app.add_url_rule('/api/trusttrail', view_func=get_trusttrail, methods=['GET', 'POST', 'OPTIONS'])
app.add_url_rule('/api/trusttrail/add_transaction', view_func=add_transaction, methods=['POST', 'OPTIONS'])



if __name__ == '__main__':
    #register_routes(app) 
    app.run(debug=True, host="0.0.0.0")

