"""
File: ./backend/app/routes/trusttrail.py
Description: This is the Flask route file handling TrustTrail operations.
Methods: 
    [x] get_trusttrail() : Handles GET request for '/trusttrail' route. Fetches the trust trail for a user.
    [x] add_transaction() : Handles POST request for '/trusttrail/add_transaction' route. Adds a transaction to the user's trust trail.
"""

from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from models.trusttrail import TrustTrail
from flask_login import login_required, current_user
from flask import current_app as app

@login_required
def get_trusttrail():
    print("yooooooooooooooooooooooooooo")    
    if request.method == 'OPTIONS':
        # Handle preflight requests for CORS
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://143.42.34.42:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        return response, 200
    elif request.method == 'GET':

        # Handle GET request for fetching the trust trail by user_id from query params
        user_id = current_user.id #request.args.get('user_id')
        trust_trail = TrustTrail.get_trusttrail(user_id)
        
        if trust_trail:
            return jsonify(trust_trail), 200
        else:
            return jsonify({"error": "TrustTrail not found"}), 404
    elif request.method == 'POST':
        # Handle POST request for fetching the trust trail by user_id from JSON body
        data = request.get_json()
        user_id = data.get('userId')
        if user_id:
            trust_trail = TrustTrail.get_trusttrail(user_id)
            if trust_trail:
                return jsonify(trust_trail), 200
            else:
                return jsonify({"error": "TrustTrail not found"}), 404
        else:
            return jsonify({'message': 'Invalid request data. Missing userId.'}), 400
    else:
        return jsonify({'message': 'Invalid request method.'}), 405


    """
    def get_trusttrail():
        if request.method == 'OPTIONS':
            # This is a preflight request. Reply successfully:
            response = app.make_default_options_response()
            # Allow CORS for the actual request:
            response.headers.add('Access-Control-Allow-Origin', 'http://143.42.34.42:3000')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
            response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            return response, 200
        elif request.method == 'POST':  # Handle POST requests separately
            data = request.get_json()
            print("get_trusttrail data:", data)
            try:
                user_id = data['userId']
                trusttrail = TrustTrail.get_trusttrail(user_id)
                return jsonify(trusttrail), 200
            except KeyError:
                return {'message': 'Invalid request data. Missing userId.'}, 400
        else:
            return {'message': 'Invalid request method.'}, 405  # Return 405 Method Not Allowed for other request methods
    """




@login_required
def add_transaction():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://143.42.34.42:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response, 200
    else:
        data = request.get_json()
        user_id = current_user.id
        other_user_id = data['other_user_id']
        project_id = data['project_id']
        TrustTrail.add_transaction(user_id, other_user_id, project_id)
        return {'message': 'Transaction added successfully'}, 200

"""
@login_required
def add_transaction():
    if request.method == 'OPTIONS':
        # This is a preflight request. Reply successfully:
        response = app.make_default_options_response()
        # Allow CORS for the actual request:
        response.headers.add('Access-Control-Allow-Origin', 'http://143.42.34.42:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response, 200
    else:
        data = request.get_json()
        user_id = data['user_id']
        other_user_id = data['other_user_id']
        project_id = data['project_id']
        TrustTrail.add_transaction(user_id, other_user_id, project_id)
        return {'message': 'Transaction added successfully'}, 200
"""