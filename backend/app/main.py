# File: ./backend/app/main.py
# Description: This file is the main entry point of the backend Flask application. It sets up and configures the Flask app, initializes LoginManager, configures CORS, defines route handlers, and starts the server.
# Classes: None
# Properties: None
# Methods: 
#    [+] load_user(user_id): Fetches the user with the given user_id from the User model, used by Flask-Login to manage user sessions.
#    [+] login(): Handles the POST request for user login, invokes the login() method from the User model, and starts a new user session.
#    [+] logout(): Handles the POST request for user logout, invokes the logout() method from the User model, and ends the current user session.
#    [+] check_session(): Checks the validity of a session.
#    [+] get_user(): Handles the GET request to fetch user profile details, it calls the get() method from the User model.
#    [+] register(): Handles the POST request for new user registration, it calls the register() method from the User model.
#    [x] app.run(): The application is not currently configured to run inside a WSGI container. It can be started using this method in a development environment.


from flask import Flask, jsonify
from flask_cors import CORS
from flask_login import LoginManager
import logging
from datetime import timedelta
from routes.cassandra import CassandraSessionInterface  # Import the custom session interface
from routes.login import load_user, login, logout, check_session
from routes.profile import get_user
from routes.registration import register
from routes.trusttrail import get_trusttrail, add_transaction

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # Increased to DEBUG level for more detailed logs
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'  # Replace with your actual secret key
app.config['SESSION_COOKIE_NAME'] = 'session_id'  # Explicitly define the session cookie name

# Enable CORS for all routes before defining any routes
CORS(app, resources={r"/api/*": {
    "origins": ["https://localhost:3000", "https://143.42.34.42:3000"],  # Update these to match your HTTPS frontend
    "allow_headers": ["Content-Type", "Authorization", "X-Requested-With", "session_id"],
    "supports_credentials": True
}})

# Set up the custom Cassandra session interface
app.session_interface = CassandraSessionInterface(
    cluster_nodes=['143.42.34.42'],  # Replace with your Cassandra nodes
    keyspace='trustsphere',  # Replace with your keyspace name
    session_lifetime=timedelta(hours=24)  # Set session lifetime
)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    logger.info(f'Loading user with user_id: {user_id}')
    return User.get(user_id)

# Route definitions
app.add_url_rule('/api/login', view_func=login, methods=['POST', 'OPTIONS'])
app.add_url_rule('/api/logout', view_func=logout, methods=['POST', 'OPTIONS'])
app.add_url_rule('/api/check_session', view_func=check_session, methods=['POST', 'GET', 'OPTIONS'])
app.add_url_rule('/api/user', view_func=get_user, methods=['GET', 'POST'])
app.add_url_rule('/api/register', view_func=register, methods=['POST'])
app.add_url_rule('/api/trusttrail', view_func=get_trusttrail, methods=['GET', 'POST', 'OPTIONS'])
app.add_url_rule('/api/trusttrail/add_transaction', view_func=add_transaction, methods=['POST', 'OPTIONS'])

@app.errorhandler(500)
def internal_error(error):
    response = jsonify({"error": "Internal Server Error"})
    response.status_code = 500
    response.headers.add('Access-Control-Allow-Origin', '*')  # Adjust to allow specific origins if needed
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

if __name__ == '__main__':
    context = ('/home/igor/TS02/backend/app/localhost.crt', '/home/igor/TS02/backend/app/localhost.key') 
    with app.app_context():
        #app.run(debug=True, ssl_context=context, host="0.0.0.0")
        app.run(debug=True, host="0.0.0.0")
