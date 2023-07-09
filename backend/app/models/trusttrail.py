# File: ./backend/app/models/trusttrail.py
# Description: Model file for handling trust trails (transaction history and trust ratings received by a user)
# Class: TrustTrail
# Properties: 
#    [-] user: Refers to the user who the trusttrail is associated with.
#    [-] transaction_history: List of all the transactions done by the user.
# Methods: 
#    [-] add_entry(data): Adds a graded entry against a transaction in a user's trust trail.
#    [-] get_entries(user): fetches all rated transactions (trust trail) of a particular user.
# Features:
#    [-] Users can view their history of transactions and the corresponding trust ratings received.
#    [-] User can grade other user's transactions (trust scores, feedbacks etc.) in form of entries in their TrustTrail.
#    [-] Users can receive trust/gratitude entries from other users in the form of textual comments.
