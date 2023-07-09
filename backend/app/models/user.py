"""
File: ./backend/app/models/user.py:
Description: Model file for handling User registration, authentication, and session management operations.
Class: User
Properties: 
	* name: name of the user.
	* email: email of the user, used for authentication.
	* password: hashed password of the user.
	* session_id: unique id for user session.
	* location: location of the user, default is "Heidelberg".
Methods: 
	[+] get_id() : returns the user's email.
	[+] to_dict() : returns user details as dictionary.
    [+] register(data): registers the user by inserting user's details in the database.
  	[x] check_password(password): checks password.
  	[+] generate_unique_session_id(): generates a unique session id for the user.
	[+] check_session(session_id): checks if the session is active or expired.
	[x] get(email): fetches the user with the given email from the database.
  	[+] get_user_by_session(session_id): fetches user information by session id.
	[x] login(data): authenticates the user and creates a new session if the password is correct.
	[x] logout(email): ends the session of the user.
"""


# Features 
"""   
   - Users can view and edit their profile information, including name, surname, location, and profile picture.
   - Profile pictures should be validated for file type and size.
   - Users can view their trust scores based on their transactions and projects.
   - Trust scores should be calculated using factors such as transaction count, transaction duration, and user feedback.
   - Users can view their transaction history and trust ratings received from other users.
   - Users can view their active transactions, projects, and votings.
"""





from cassandra.cluster import Cluster
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, current_user
from flask import jsonify
import uuid
from datetime import datetime, timedelta
from cassandra.query import SimpleStatement, ConsistencyLevel, dict_factory


cluster = Cluster(['143.42.34.42'])  # provide your Cassandra host here
cassandra_session = cluster.connect()
#cassandra_session.row_factory = dict_factory

class User(UserMixin):
    def __init__(self, name, email, password, session_id):
        self.name = name
        self.email = email
        self.password = password
        self.session_id = session_id
        self.location = 'Heidelberg'

    def get_id(self):
        return self.email

    def to_dict(self):
        return {
            'name': self.name,
            'email': self.email,
            'password': self.password,
            'session_id': self.session_id }

    @classmethod
    def register(cls, data):
        name = data['name']
        email = data['email']
        password = generate_password_hash(data['password'])

        # create the user in Cassandra
        query = "INSERT INTO TrustSphere.users (email, name, password) VALUES (%s, %s, %s);"
        cassandra_session.execute(query, (email, name, password))

        return cls(name, email, password, '')




    def check_password(self, password):
        return check_password_hash(self.password, password)


    """     @classmethod
    def create_session(cls, user_id):
        session_id = User.generate_unique_session_id() 
        query = "INSERT INTO TrustSphere.sessions (session_id, user_email, creation_time, last_active_at) VALUES (%s, %s, NOW(), NOW());"
        cassandra_session.execute(query, (session_id, user_id))
        return session_id """
    

    @staticmethod
    def generate_unique_session_id():
        # generate a random UUID
        return str(uuid.uuid4())
    

    @classmethod
    def check_session(cls, session_id):
        # get the session from Cassandra
        query = "SELECT * FROM TrustSphere.sessions WHERE session_id = %s ALLOW FILTERING"
        print('user checking session:', session_id)
        if session_id == 'undefined':
            return False
        rows = cassandra_session.execute(query, (uuid.UUID(session_id),))

        for row in rows:
            if row:
                current_time = datetime.utcnow()
                # Check if the session is expired
                if row.expire_at < current_time:
                    return False

                # If session is not expired, update the last_active_at and expire_at
                new_expire_at = current_time + timedelta(hours=1)  # Extend session expiration by 1 hour
                update_query = "UPDATE TrustSphere.sessions SET last_access_time = %s, expire_at = %s WHERE session_id = %s"
                cassandra_session.execute(update_query, (current_time, new_expire_at, uuid.UUID(session_id)))

                return True

        return False

    @classmethod
    def get(cls, email):
        rows = cassandra_session.execute("""SELECT * FROM TrustSphere.users WHERE email = %s""", [email])
        for user_row in rows:
            session_rows = cassandra_session.execute("""
                SELECT session_id FROM TrustSphere.sessions 
                WHERE user_email = %s AND expire_at > toTimestamp(now()) 

                LIMIT 1 ALLOW FILTERING
            """, [email])
            for session_row in session_rows:
                return cls(user_row.name, user_row.email, user_row.password, session_row.session_id)
        return None
    
    @classmethod
    def get_user_by_session(cls, session_id):
        # get the session from Cassandra
        query = "SELECT * FROM TrustSphere.sessions WHERE session_id = %s ALLOW FILTERING"
        print('user checking session:',session_id)
        if session_id == 'undefined':
            return False
        rows = cassandra_session.execute(query, (uuid.UUID(session_id),))
        
        for row in rows:
            user_email = row.user_email
            user = cls.get(user_email)

            return (user.name, user.email, user.location)

        return None



    @classmethod
    def login(cls, data):
        email = data['email']
        password = data['password']  # in real life, hash this!

        # get the user from Cassandra

        rows = cassandra_session.execute("""SELECT * FROM TrustSphere.users WHERE email = %s LIMIT 1 ALLOW FILTERING""", [email])

        for row in rows:
            if row:
                user = cls(row.name, row.email, row.password, '')
                if user.check_password(password):
                    
                    # User found and password matches, create a new session
                    session_id = User.generate_unique_session_id()
                    uuid_session_id = uuid.UUID(session_id)
                    expire_at = datetime.utcnow() + timedelta(hours=1)  # Set session to expire in 1 hour
                    creation_time = datetime.utcnow()
                    
                    # Insert the session into the sessions table
                    session_query = SimpleStatement(
                        "INSERT INTO TrustSphere.sessions (session_id, user_email, expire_at, creation_time) VALUES (%s, %s, %s,%s)",
                        consistency_level=ConsistencyLevel.LOCAL_QUORUM
                    )
                    cassandra_session.execute(session_query, (uuid_session_id, row.email, expire_at, creation_time))

                    # Return the user with the session_id
                    user.session_id = session_id
                    print(session_id)
                    return user

        return None
    

    @classmethod
    def logout(cls, session_id):
        # First, fetch the session ID for this user
        rows = cassandra_session.execute("SELECT user_email FROM TrustSphere.sessions WHERE session_id = %s ALLOW FILTERING", (uuid.UUID(session_id),))
        for row in rows:
            # For each session, delete it
            cassandra_session.execute("DELETE FROM TrustSphere.sessions WHERE session_id = %s", (uuid.UUID(session_id),))

        return True
    

