# File: ./backend/app/models/union.py
# Description: Model file for handling Union operations. Unions are groups of users within the TrustSphere platform.
# Class: Union
# Properties: 
#   [+] union_id: Unique identifier for each union.
#   [+] name: Name of the union.
#   [+] members: List of user IDs that are members of this union.
#   [+] description: Description or purpose of the union.
#   [+] created_at: Timestamp indicating when the union was created.
# Methods: 
#   [+] create_union(data): Creates a new union with the specified details.
#   [+] get_union(union_id): Retrieves the details of a specified union.
#   [+] update_union(union_id, data): Updates the specified details of an existing union.
#   [+] delete_union(union_id): Removes a union from the system.
#   [+] add_member(union_id, user_id): Adds a new member to the union.
#   [+] remove_member(union_id, user_id): Removes a member from the union.
#   [+] list_members(union_id): Lists all members of the union.
# Features:
#   - Users can create groups (unions) to collaborate or share specific functionalities.
#   - Unions can be managed by adding or removing members.
#   - Users can query information about specific unions, including all members.
#   - Allow updating of union details such as name and description.
#   - Provide functionalities to dissolve (delete) unions when no longer needed.