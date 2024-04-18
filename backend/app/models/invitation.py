"""
File: ./backend/app/models/invitation.py:
Description: This module contains the Invitation model for handling user invitation related tasks.
Class: Invitation
Properties: 
	[-] code: A unique identifier for the invitation.
	[-] email: Email of the user to be invited.
Methods:
    [-] create_invitatiion(self, email, current_user_id): Creates an invitation in Cassandra TrustSphere.invitations table, and sends an invitation to the provided email address.

Related Features:
    [-] Users can invite others to join the platform using email invitations.
    [-] Email invitations validation for email format and uniqueness.
"""

from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model
from cassandra.cqlengine import connection
from cassandra.cqlengine.management import sync_table
from cassandra.cqlengine.query import DoesNotExist
from cassandra.util import uuid_from_time

from ..utils.email_sending import send_invitation_email

class Invitation(Model):
    code = columns.UUID(primary_key=True, default=uuid_from_time)
    email = columns.Text(required=True, index=True)

    @classmethod
    def create_invitation(cls, email, current_user_id):
        # Check if the email is already invited
        try:
            Invitation.objects.get(email=email)
            return {'message': 'Email already invited.'}, 409
        except DoesNotExist:
            pass
        
        # Create the invitation
        invitation = Invitation.create(email=email)
        
        # Send the invitation email
        send_invitation_email(email, invitation.code, current_user_id)
        
        return {'message': 'Invitation sent successfully.'}, 200

# Sync the model with the database
sync_table(Invitation)