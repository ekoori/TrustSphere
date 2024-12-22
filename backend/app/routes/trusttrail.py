"""
File: ./backend/app/routes/trusttrail.py
Description: This is the Flask route file handling TrustTrail operations.
Methods: 
    [x] get_trusttrail() : Handles GET request for '/trusttrail' route. Fetches the trust trail for a user.
    [x] add_transaction() : Handles POST request for '/trusttrail/add_transaction' route. Adds a transaction to the user's trust trail.
"""

from flask import request, jsonify
from app.models.trusttrail import TrustTrail
from flask_login import login_required, current_user

@login_required
def get_trusttrail():
    if request.method == 'GET':
        # Handle GET request for fetching the trust trail by user_id from query params
        user_id = current_user.id
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

@login_required
def add_transaction():
    data = request.get_json()
    user_id = current_user.id
    other_user_id = data['other_user_id']
    project_id = data['project_id']
    TrustTrail.add_transaction(user_id, other_user_id, project_id)
    return {'message': 'Transaction added successfully'}, 200