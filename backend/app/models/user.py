# File: ./backend/app/models/user.py
# Description: This file defines the User model, which manages user authentication, registration, session management, and user retrieval using Cassandra
#              as the database.
# Classes:
#    [+] User - Represents a user in the application, with methods to manage user authentication, registration, session management, and retrieval.
# Properties:
#    [+] name - The name of the user.
#    [+] email - The email address of the user.
#    [+] password - The hashed password of the user.
#    [+] user_id - The unique identifier for the user.
#    [+] session_id - The current session identifier associated with the user.
# Methods: 
#    [+] __init__(self, name, email, password, user_id, session_id=None): Initializes a new User instance with the provided details.
#    [+] get_id(self): Returns the user_id of the user as a string.
#    [+] to_dict(self): Returns the user's details as a dictionary.
#    [+] register(cls, data): Registers a new user in the system and stores the user details in Cassandra.
#    [+] login(cls, data): Authenticates a user by checking the provided credentials against stored records in Cassandra.
#    [+] get_existing_session(cls, user_id): Retrieves an existing session ID for a user if one exists and is active.
#    [+] check_session(cls, session_id): Verifies if a session with the given session_id is still active.
#    [+] logout(cls, session_id): Logs out a user by deleting their session from Cassandra.
#    [+] get(cls, user_id): Retrieves a user's details from Cassandra using their user_id.

from cassandra.cluster import Cluster
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import uuid
import logging
from routes.cassandra import CassandraSessionInterface  # Correct import
from datetime import datetime, timedelta

# Set up Cassandra session
cluster = Cluster(['143.42.34.42'])
cassandra_session = cluster.connect('trustsphere')

class User(UserMixin):
    def __init__(self, email, password, user_id, session_id=None):
        self.name = "name"
        self.email = email
        self.password = password
        self.user_id = user_id
        self.session_id = session_id

    def get_id(self):
        return str(self.user_id)

    def to_dict(self):
        return {
            'name': self.name,
            'user_id': str(self.user_id),
            'email': self.email,
            'session_id': str(self.session_id) if self.session_id else None
        }

    @classmethod
    def register(cls, data):
        name = data['name']
        email = data['email']
        password = generate_password_hash(data['password'])
        user_id = uuid.uuid4()
        logging.info(f'Registering user with user_id: {user_id}')

        query = "INSERT INTO users (user_id, email, name, password) VALUES (%s, %s, %s, %s)"
        cassandra_session.execute(query, (user_id, email, name, password))

        return cls(name, email, password, user_id)

    @classmethod
    def login(cls, data):
        email = data['email']
        password = data['password']
        logging.info(f'Attempting login for email: {email}')

        query = "SELECT * FROM user_credentials WHERE email = %s ALLOW FILTERING"
        rows = cassandra_session.execute(query, (email,))

        for row in rows:
            if check_password_hash(row.password, password):
                # now querying user_credentials instead of users, new table has no name field so we'll have to pull it from users in a separate query if needed.
                #user = cls(row.name, row.email, row.password, row.user_id)
                user = cls(row.email, row.password, row.user_id)
                
                # Get existing session ID, if any
                existing_session_id = cls.get_existing_session(user.user_id)
                if existing_session_id:
                    user.session_id = str(existing_session_id)
                else:
                    user.session_id = None  # Set to None so that the session is handled by login.py

                logging.info(f'User logged in with session_id: {user.session_id}')
                return user
        
        logging.error('Invalid email or password')
        return None

    @classmethod
    def get_existing_session(cls, user_id):
        query = "SELECT session_id FROM sessions WHERE user_id = %s AND expire_at > %s ALLOW FILTERING"
        rows = cassandra_session.execute(query, (user_id, datetime.utcnow()))

        for row in rows:
            return row.session_id
        
        return None

    @classmethod
    def check_session(cls, session_id):
        logging.info(f'Checking session with session_id: {session_id}')
        query = "SELECT * FROM sessions WHERE session_id = %s"
        rows = cassandra_session.execute(query, (uuid.UUID(session_id),))

        for row in rows:
            if row.expire_at > datetime.utcnow():
                logging.info(f'Session is active for session_id: {session_id}')
                return True
        logging.error(f'Session is inactive for session_id: {session_id}')
        return False

    @classmethod
    def logout(cls, session_id):
        try:
            # Debug: Print the session ID to ensure it's correct
            logging.info(f'Logging out session with session_id: {session_id}')

            # Convert the session_id to a UUID object
            session_uuid = uuid.UUID(session_id)

            # Query to delete the session
            query = "DELETE FROM sessions WHERE session_id = %s"

            # Execute the delete query
            result = cassandra_session.execute(query, (session_uuid,))

            # Debug: Check if the deletion was successful
            logging.info(f'Session with session_id {session_id} has been deleted. Result: {result}')

        except Exception as e:
            logging.error(f'Error during logout: {e}')


    @classmethod
    def get(cls, user_id):
        logging.info(f'Fetching user with user_id: {user_id}')
        query = "SELECT * FROM users WHERE user_id = %s"
        rows = cassandra_session.execute(query, (uuid.UUID(user_id),))

        for row in rows:
            return cls(row.name, row.email, row.password, row.user_id)

        logging.error(f'User not found with user_id: {user_id}')
        return None
