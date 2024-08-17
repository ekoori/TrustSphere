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
from flask import request
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
        session_cookie_name = app.config.get('SESSION_COOKIE_NAME', 'session_id')
        session_id = request.cookies.get(session_cookie_name)
        
        if session_id:
            result = self.cassandra_session.execute(
                "SELECT session_id, user_email, user_id FROM sessions WHERE session_id = %s", 
                [uuid.UUID(session_id)]
            )
            if result:
                data = result.one()
                session_data = {'user_email': data.user_email, 'user_id': str(data.user_id), 'session_id': str(data.session_id)}
                session = CassandraSession(session_id, initial=session_data)
                app.logger.debug(f'Session opened with session_id: {session_id}')
                return session

        session_id = str(uuid.uuid4())
        app.logger.debug(f'New session created with session_id: {session_id}')
        return CassandraSession(session_id)


    def save_session(self, app, session, response):
        # Skip saving session for OPTIONS requests
        if request.method == 'OPTIONS':
            return

        session_id = session.get('session_id')
        
        if not session_id:
            app.logger.error(f"Session ID is missing; unable to save session")
            return

        user_email = session.get('user_email')
        user_id = session.get('user_id')

        # Ensure UUIDs are strings before saving
        if isinstance(user_id, uuid.UUID):
            user_id = str(user_id)

        if isinstance(session_id, uuid.UUID):
            session_id = str(session_id)
        
        # Log the session data
        app.logger.debug(f"Attempting to save session: session_id={session_id}, user_email={user_email}, user_id={user_id}, session_data={dict(session)}")

        if not user_email or not user_id:
            app.logger.error(f"Session data is missing user_email or user_id, skipping save")
            return

        try:
            now = datetime.utcnow()
            expire_at = now + self.session_lifetime

            # Insert or update the session data in Cassandra
            query = """
                INSERT INTO sessions (session_id, user_email, user_id, creation_time, last_access_time, expire_at, data) 
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """

            session_data = dict(session)
            data = None  # Convert session_data to JSON or another format if needed

            self.cassandra_session.execute(query, (
                uuid.UUID(session_id), user_email, uuid.UUID(user_id), 
                now, now, expire_at, data
            ))

            # Only set the cookie if it hasn't been set already
            if 'Set-Cookie' not in response.headers:
                #response.set_cookie(app.config.get('SESSION_COOKIE_NAME', 'session_id'), session_id, httponly=True, secure=False, samesite='None', domain="localhost", path="/")
                response.set_cookie(
                    app.config.get('SESSION_COOKIE_NAME', 'session_id'), 
                    session_id, 
                    httponly=True, 
                    secure=False,  # Temporarily set to False for local development
                    samesite='None', 
                    #domain="localhost:3000", 
                    path="/"
                )
            else:
                app.logger.debug(f"Set-Cookie header already present, not adding again.")
                
        except Exception as e:
            app.logger.error(f"Error saving session: {e}")
