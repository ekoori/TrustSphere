#registration.py

from flask import Blueprint, request, jsonify

#from flask import current_app as app
from models.user import User

registration = Blueprint('registration', __name__)


def register():
    # Get the posted data
    data = request.get_json()

    # Attempt to register the user
    user = User.register(data)

    if user:
        return jsonify({'message': 'User registered successfully.'}), 200
    else:
        return jsonify({'message': 'Registration failed.'}), 400


