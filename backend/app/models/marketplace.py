# File: ./backend/app/models/marketplace.py
# Description: Model file for managing services marketplace, including posting, requesting, and transacting services.
# Class: Marketplace
# Properties: 
#    [-] services: List of services offered and requested by the users.
#    [-] active_transactions: List of transactions that have been activated upon the acceptance of services.
# Methods: 
#    [-] post_service(cls, service_data): Posts a new service to the marketplace.
#    [-] browse_services(cls, filters): Allows users to browse available services based on specified filters.
#    [-] request_service(cls, service_id, user_id): Enables users to request a service.
#    [-] accept_service(cls, service_id, user_id): Marks a service as accepted and initiates an active transaction.
# Features:
#    [-] Users can post services they offer or browse and request services from other users.
#    [-] Services are validated for relevant information, such as title, description, and association with projects.
#    [-] Services can be standalone or part of projects.
#    [-] When a service offer is accepted, it becomes an active transaction.
#    [-] Users can leave trust/gratitude entries on active transactions.