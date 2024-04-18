"""
File: ./backend/app/models/project.py
Description: Model file for handling all Project-related operations. 
Class: Project
Properties: 
    * project_id: unique identifier for the project.
    * name: name of the project.
    * owner: user that created the project.
    * status: current status of the project (active/completed).
    * members: users participating in the project.
    * votings: current votings related to the project.
    * services: services associated with this project.
Methods:
    * create_project(name, owner): creates a new project.
        [+] Implementation Status: Complete 
    * join_project(user_id): adds a new user to the project.
        [x] Implementation Status: Partial 
    * view_project(): retrieves the project details.
        [+] Implementation Status: Complete 
    * is_member(user_id): checks if a user is a member of the project.
        [+] Implementation Status: Complete 
    * get_projects_for_user(user_id): retrieves all projects related to a specific user.
        [-] Implementation Status: Outstanding
    * add_voting(voting): adds new voting to the project.
        [+] Implementation Status: Complete 
    * add_service(service): adds new service to the project.
        [+] Implementation Status: Complete 

Features:
   - Users can create, join, and view projects within their community.
   - Projects can be active or completed.
   - Project ownership is assigned to the user who creates the project.
   - Project ownership can be transferred to other users if needed.
   - Projects have votings, service requests, and active transactions associated with them.
   - Users can accept service requests for their projects.
   - Users can view active projects and activities on the project.        
        
   


4. Project:
   - Properties: name, owner, status, votings, service_requests, active_transactions
   - Methods: create_project, join_project, view_project, accept_service_request, add_voting_choice, make_admin

"""