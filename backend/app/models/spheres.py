from cassandra.cluster import Cluster
import uuid
import logging
from datetime import datetime
import base64

# Set up Cassandra session
cluster = Cluster(['172.236.62.11'])
cassandra_session = cluster.connect('trustsphere')

class Sphere:
    def __init__(self, sphere_id, name, description, value_graph, location, image, admin1, participants, unions, projects, values):
        self.sphere_id = sphere_id
        self.name = name
        self.description = description
        self.value_graph = value_graph
        self.location = location
        self.image = image
        self.admin1 = admin1
        self.participants = participants
        self.unions = unions
        self.projects = projects
        self.values = values

    def to_dict(self):
        return {
            'sphere_id': str(self.sphere_id),
            'name': self.name,
            'description': self.description,
            'value_graph': self.value_graph,
            'location': self.location,
            'image': base64.b64encode(self.image).decode('utf-8') if self.image else None,
            'admin1': str(self.admin1),
            'participants': self.participants,
            'unions': self.unions,
            'projects': self.projects,
            'values': self.values
        }

    @classmethod
    def create(cls, data, admin1):
        sphere_id = uuid.uuid4()
        name = data['name']
        description = data['description']
        value_graph = data['value_graph']
        location = data['location']
        image = data['image']
        participants = [admin1]
        unions = data.get('unions', [])
        projects = data.get('projects', [])
        values = data.get('values', [])
        logging.info(f'Creating sphere with sphere_id: {sphere_id}')

        query = """
        INSERT INTO spheres (sphere_id, name, description, value_graph, location, image, admin1, participants, unions, projects, values, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cassandra_session.execute(query, (sphere_id, name, description, value_graph, location, image, admin1, participants, unions, projects, values, datetime.utcnow()))

        return cls(sphere_id, name, description, value_graph, location, image, admin1, participants, unions, projects, values)
