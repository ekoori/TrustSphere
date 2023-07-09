"""
File: ./backend/app/models/invitation.py:
Description: This module contains the Invitation model for handling user invitation related tasks.
Class: Invitation
Properties: 
	[-] code: A unique identifier for the invitation.
	[-] email: Email of the user to be invited.
Methods:
    [-] send_invitation(self, email): Sends an invitation to the provided email address.

Related Features:
    [-] Users can invite others to join the platform using email invitations.
    [-] Email invitations validation for email format and uniqueness.
"""