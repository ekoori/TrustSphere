import logging
from flask import request, jsonify, current_app as app
from app.models.spheres import Sphere
from app.middleware.session_middleware import validate_session
import uuid

logger = logging.getLogger(__name__)

@validate_session
def create_sphere(user_id=None):
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        return response, 200

    try:
        if 'multipart/form-data' in request.content_type:
            data = request.form
            image = request.files.get('image')
            if image:
                image = image.read()
        else:
            data = request.get_json()
            image = data.get('image')

        logger.debug(f"Received sphere creation data: {data}")
        if not data:
            logger.error("No data provided for sphere creation")
            response = jsonify({'message': 'No data provided'})
            return response, 400

        logger.info(f"Creating new sphere by user_id: {user_id}")
        
        # Ensure user_id is a UUID
        user_id = uuid.UUID(str(user_id))
        
        # Create new sphere
        new_sphere = Sphere.create(
            data={
                'name': data.get('name'),
                'description': data.get('description'),
                'value_graph': data.get('value_graph'),
                'location': data.get('location'),
                'image': image
            },
            admin1=user_id
        )
        
        if new_sphere:
            logger.info(f"Successfully created new sphere with sphere_id: {new_sphere.sphere_id}")
            response = jsonify(new_sphere.to_dict())
            return response, 201
        else:
            logger.error("Failed to create new sphere")
            response = jsonify({'message': 'Failed to create new sphere'})
            return response, 400

    except Exception as e:
        logger.error(f"Error in create_sphere: {str(e)}")
        response = jsonify({'message': 'Internal server error'})
        return response, 500

@validate_session
def get_spheres(user_id=None):
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        return response, 200

    try:
        logger.info(f"Fetching spheres for user_id: {user_id}")
        
        query = "SELECT * FROM spheres"
        rows = app.session_interface.cassandra_session.execute(query)

        spheres = []
        sphere_ids = set()
        for row in rows:
            if row.sphere_id in sphere_ids:
                logger.warning(f"Duplicate sphere_id found: {row.sphere_id}")
                continue
            sphere_ids.add(row.sphere_id)
            sphere = Sphere(
                sphere_id=row.sphere_id,
                name=row.name,
                description=row.description,
                value_graph=row.value_graph,
                location=row.location,
                image=row.image,
                admin1=row.admin1,
                participants=row.participants,
                unions=row.unions,
                projects=row.projects,
                values=row.values
            )
            spheres.append(sphere.to_dict())

        logger.info(f"Successfully retrieved {len(spheres)} spheres")
        response = jsonify(spheres)
        return response, 200

    except Exception as e:
        logger.error(f"Error in get_spheres: {str(e)}")
        response = jsonify({'message': 'Internal server error'})
        return response, 500
