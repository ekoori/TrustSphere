# File: ./backend/app/models/user.py
# Description: Model file for handling User registration, authentication, and session management operations.
# Class: User
# Properties:
#   [+] name: name of the user.
#   [+] email: email of the user, used for authentication.
#   [+] password: hashed password of the user.
#   [/] session_id: unique id for user session, may not be managed directly by User but implemented via session management.
#   [+] location: location of the user, default is "Heidelberg".
# Methods: 
#   [+] get_id(): Returns the user's email.
#   [+] to_dict(): Returns user details as dictionary.
#   [+] register(data): Registers the user by inserting user's details in the database.
#   [/] check_password(password): Checks password using hash verification (partially since actual check is done via Werkzeug security function).
#   [+] generate_unique_session_id(): Generates a unique session id for the user.
#   [/] check_session(session_id): Checks if the session is active or expired, includes handling session renewal.
#   [/] get(email): Fetches the user with the given email from the database, operational but might be optimizable.
#   [/] login(data): Authenticates the user and creates a new session if the password is correct, requires optimization and error handling improvement.
#   [/] logout(email): Ends the session of the user, implemented but requires thorough testing to ensure complete cleanup.
#   [/] get_user_by_session(session_id): Fetches user information by session id, partially implemented with needs for efficiency improvement
# Features:
#   - Users can view and edit their profile information, including name, surname, location, and profile picture.
#   - Profile pictures should be validated for file type and size. (Not yet implemented in the provided methods)
#   - Users can view their trust scores based on their transactions and projects. (Not directly available in User model but can be assumed through interaction with other models)
#   - Trust scores should be calculated using factors such as transaction count, transaction duration, and user feedback. (Inferred feature interaction with another model)
#   - Users can view their transaction history and trust ratings received from other users. (Depends on integration with transactional systems)
#   - Users can view their active transactions, projects, and votings. (Assumed interaction with separate components handling these entities)


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
    def __init__(self, name, email, password, session_id, user_id):
        self.name = name
        self.user_id = user_id
        self.email = email
        self.password = password
        self.session_id = session_id
        self.location = 'Heidelberg'

    def get_id(self):
        return self.email

    def to_dict(self):
        return {
            'name': self.name,
            'user_id': self.user_id,
            'email': self.email,
            'password': self.password,
            'session_id': self.session_id }

    @classmethod
    def register(cls, data):
        name = data['name']
        email = data['email']
        password = generate_password_hash(data['password'])

        # create the user in Cassandra
        query = "INSERT INTO TrustSphere.users (user_id, email, name, password) VALUES (uuid(), %s, %s, %s);"
        cassandra_session.execute(query, (email, name, password))


        # retrieve the user_id of the newly created user
        query = "SELECT user_id FROM TrustSphere.users WHERE email = %s ALLOW FILTERING;"
        result = cassandra_session.execute(query, (email,))
        user_id = result.one().user_id



        
        

        return cls(name, email, password, '', user_id)




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
    def get(cls, user_id):
        rows = cassandra_session.execute("""SELECT * FROM trustsphere.users WHERE user_id = %s""", (uuid.UUID(user_id),))

        for user_row in rows:
            user = cls(
                name=user_row.name,
                email=user_row.email,
                password=user_row.password,
                session_id="",
                user_id=user_row.user_id
            )
            return user
        return None

    
    @classmethod
    def get_user_by_session(cls, session_id, user_id):
        # get the session from Cassandra
        query = "SELECT * FROM TrustSphere.sessions WHERE session_id = %s and user_id = %s ALLOW FILTERING"
        print('user checking session:',session_id)
        if session_id == 'undefined':
            return False
        rows = cassandra_session.execute(query, (uuid.UUID(session_id), uuid.UUID(user_id)))
        
        for row in rows:
            user_email = row.user_email

            user = cls.get(user_id)

            return user

        return None



    @classmethod
    def login(cls, data):
        email = data['email']
        password = data['password']  # in real life, hash this!

        # get the user from Cassandra

        rows = cassandra_session.execute("""SELECT * FROM TrustSphere.users WHERE email = %s LIMIT 1 ALLOW FILTERING""", [email])

        for row in rows:
            if row:
                user = cls(row.name, row.email, row.password, row.user_id, '')
                if user.check_password(password):
                    print("debug>>> in model.login")
                    # User found and password matches, create a new session
                    session_id = User.generate_unique_session_id()
                    uuid_session_id = uuid.UUID(session_id)
                    expire_at = datetime.utcnow() + timedelta(hours=1)  # Set session to expire in 1 hour
                    creation_time = datetime.utcnow()
                    
                    user_id = row.user_id
                    email = row.email
                    location = row.location
                    name = row.name
                    
                    # Insert the session into the sessions table
                    session_query = SimpleStatement(
                        "INSERT INTO TrustSphere.sessions (session_id, user_email, expire_at, creation_time, user_id) VALUES (%s, %s, %s, %s, %s)",
                        consistency_level=ConsistencyLevel.LOCAL_QUORUM
                    )
                    try:
                        cassandra_session.execute(session_query, (uuid_session_id, row.email, expire_at, creation_time, row.user_id))
                    except Exception as e:
                        print("Error inserting session: ", e)
                        session_id = ""

                    # Return the user with the session_id
                    user.session_id = cls.session_id = session_id
                    user.user_id = cls.user_id = user_id
                    user.location = cls.location = location
                    user.name = cls.name = name
                    


                    print("session: ",session_id)
                    print("user logged in: ",name, "(",user_id,")")
                    
                    return cls(name, email, password, session_id, user_id)

        return None
    

    @classmethod
    def logout(cls, session_id):
        # First, fetch the session ID for this user
        rows = cassandra_session.execute("SELECT user_email FROM TrustSphere.sessions WHERE session_id = %s ALLOW FILTERING", (uuid.UUID(session_id),))
        for row in rows:
            # For each session, delete it
            cassandra_session.execute("DELETE FROM TrustSphere.sessions WHERE session_id = %s", (uuid.UUID(session_id),))

        return True
    

