# File: ./backend/app/routes/cassandra.py
# Description: This file defines the session handling using Cassandra as the backend for storing session data.
# Classes: 
#    [+] CassandraSession - A custom session object to hold session data.
#    [+] CassandraSessionInterface - The session interface responsible for interacting with the Cassandra database.
# Methods: 
#    [+] open_session() - Retrieves the session data from Cassandra based on the session_id.
#    [+] save_session() - Saves or updates the session data in Cassandra.

from flask.sessions import SessionInterface, SessionMixin
from cassandra.cluster import Cluster
from flask import request  # Import the request object
import uuid
from datetime import datetime, timedelta

class CassandraSession(dict, SessionMixin):
    def __init__(self, session_id, initial=None):
        super().__init__(initial or ())
        self.session_id = session_id

class CassandraSessionInterface(SessionInterface):
    def __init__(self, cluster_nodes, keyspace, session_lifetime):
        self.cluster = Cluster(cluster_nodes)
        self.cassandra_session = self.cluster.connect(keyspace)
        self.session_lifetime = session_lifetime

    def open_session(self, app, request):
        session_cookie_name = app.config.get('SESSION_COOKIE_NAME', 'session')
        session_id = request.cookies.get(session_cookie_name)
        if session_id:
            result = self.cassandra_session.execute(
                "SELECT * FROM sessions WHERE session_id = %s", 
                [uuid.UUID(session_id)]
            )
            if result:
                data = result[0].data  # Directly use the data map from Cassandra
                return CassandraSession(session_id, initial=data)
        session_id = str(uuid.uuid4())
        return CassandraSession(session_id)

    def save_session(self, app, session, response):
        # Skip saving session for OPTIONS requests
        if request.method == 'OPTIONS':
            return
        
        session_id = session.session_id
        user_email = session.get('user_email')
        user_id = session.get('user_id')
        
        # Log the session data to understand what's available at the time of saving
        app.logger.debug(f"Attempting to save session: session_id={session_id}, user_email={user_email}, user_id={user_id}, session_data={dict(session)}")

        # Only proceed with saving if we have both user_email and user_id
        if not user_email or not user_id:
            app.logger.error(f"Session data is missing user_email or user_id, skipping save")
            return  # Early return, skip the session save

        try:
            expire_at = datetime.utcnow() + self.session_lifetime
            session_data = {str(k): str(v) for k, v in dict(session).items()}

            query = """
                INSERT INTO sessions (session_id, data, expire_at, user_email, user_id) 
                VALUES (%s, %s, %s, %s, %s)
            """
            self.cassandra_session.execute(query, (uuid.UUID(session_id), session_data, expire_at, user_email, user_id))

            response.set_cookie(app.config.get('SESSION_COOKIE_NAME', 'session_id'), session_id, httponly=True, secure=False, samesite='None')
        except Exception as e:
            app.logger.error(f"Error saving session: {e}")
