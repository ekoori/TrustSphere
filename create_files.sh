#!/bin/bash

# Backend directories and files
mkdir -p backend/app/models backend/app/utils backend/app/routes backend/app/tests
touch backend/app/main.py
touch backend/app/models/user.py
touch backend/app/models/trusttrail.py
touch backend/app/models/marketplace.py
touch backend/app/models/project.py
touch backend/app/models/voting.py
touch backend/app/models/invitation.py
touch backend/app/utils/hashing.py
touch backend/app/utils/email_sending.py
touch backend/app/routes/registration.py
touch backend/app/routes/login.py
touch backend/app/routes/profile.py
touch backend/app/routes/trusttrail.py
touch backend/app/routes/marketplace.py
touch backend/app/routes/projects.py
touch backend/app/routes/voting.py
touch backend/app/routes/invitation.py
touch backend/app/tests/test_registration.py
touch backend/app/tests/test_login.py
touch backend/app/tests/test_profile.py
touch backend/app/tests/test_trusttrail.py
touch abackend/pp/tests/test_marketplace.py
touch backend/app/tests/test_projects.py
touch backend/app/tests/test_voting.py
touch backend/app/tests/test_invitation.py
touch backend/requirements.txt
# Frontend directories and files
mkdir -p frontend/src/components
mkdir -p frontend/src/pages
touch frontend/src/pages/Home.js
touch frontend/src/components/UserRegistration.js
touch frontend/src/components/UserLogin.js
touch frontend/src/components/UserProfile.js
touch frontend/src/components/TrustTrail.js
touch frontend/src/components/Marketplace.js
touch frontend/src/components/Projects.js
touch frontend/src/components/Voting.js

# Database directory and file
mkdir database
touch database/cassandra.py

