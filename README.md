# TrustSphere

## Introduction

TrustSphere is a social platform designed to foster stronger connections within communities. It's built on the principles of the gift economy and liquid democracy. The goal of TrustSphere is to empower individuals and communities to share resources and make collective decisions in a transparent and engaged manner.

Our purpose is to redefine how we engage with the economy and democracy. TrustSphere seeks to promote an alternative to money-driven society, a culture of giving, where goods and services are given without a need for any explicit agreement for immediate or future rewards. By incorporating liquid democracy, we aim to make decision-making more accessible and representative.

## Key Focus

- **Trust-Based Transactions**: Encouraging interactions based on trust, respect, and mutual support. 
- **Gift Economy**: Promoting a culture of giving, where goods and services are given without any explicit agreement for immediate or future rewards.
- **Liquid Democracy**: Striving for a democratic system where the power is in the hands of the many, not the few. 
- **Transparency**: Ensuring that all transactions and decisions are made visible, fostering accountability and trust among users.
- **Community Empowerment**: Giving communities the tools they need to organize, share resources, and make collective decisions that benefit all members.

## High-Level Concepts and Functionality Breakdown

- TrustiFact - is a recorded entry detailing a specific transaction or interaction that has occurred between parties. It serves as a testament to a trust-building or trust-affirming action, similar to a digital artifact that captures and preserves moments of trust.
- Shoutout - is a type of TrustiFact that can be publicly linked to a user's profile, allowing anyone on the platform to acknowledge or praise others. It’s a simple yet powerful way to enhance a user’s reputation and visibility.
- TrustTrail - is a comprehensive record that aggregates all TrustiFacts and Shoutouts associated with a profile. This trail functions as a historical ledger of a user’s or union's transactions, providing a transparent backstory of trust-related activities.
- Profile - At the center of TrustSphere is the Profile. Whether it belongs to an individual user or a union (a group of users), it centralises basic personal or group information, a TrustTrail, and details about offers, requests, and projects. Union profiles are unique as they require delegated management, meaning decisions and actions can be performed by designated members.
- Union - is essentially a group of users who come together for a common purpose or to manage collective activities.
- Sphere - represents a broader community which might consist of individual users, unions, and projects that share common values or geographic ties.
- Project - Projects within TrustSphere are collaborative efforts where both individuals and companies can contribute. Each project is led by a mission and governed by a specific set of policies, which can be dynamically adjusted by users possessing the appropriate authority.
- Value graph - is a structured representation of the values associated with a profile, company, or project. It leverages a sophisticated algorithm to facilitate matches across the network and is crucial for generating relevant statistical data. The platform provides a user-friendly Value Graph Creation Wizard to aid users in establishing their Value Graphs.
- Offers/Requests - Users and companies can post offers or requests on TrustSphere’s marketplace. This functionality enables users to state what they can provide or need, allowing for efficient resource matching within the community.
- Marketplace - The marketplace in TrustSphere acts as the central hub where offers and requests are exchanged, fostering an environment of support and mutual benefit.
- Project Management and Voting Panel - TrustSphere supports hierarchies within companies, enabling appropriate delegation of voting rights and decision-making powers. Issues within the platform can be democratically voted upon, with results potentially influencing changes in project direction or organizational structure.
- Issue can be voted on, issue (result) can be linked to the delegation commands in TrustSphere, or changes in hierarchy

## Technologies Used

- **React**: For frontend development.
- **Flask**: For creating RESTful APIs.
- **Cassandra**: For database management.

## Requirements

- Python 3.7+
- Node.js 14.0+
- Cassandra

## Installation and Setup

1. Clone the repository:

git clone https://github.com/ekoori/TrustSphere
cd TrustSphere

2. Install Python dependencies:

pip install -r ./backend/requirements.txt

3. Install JavaScript dependencies:

cd frontend
npm install

4. Run Cassandra service.
5. Run the backend server:

cd backend
python server.py

6. Run the frontend:

cd frontend
npm start

For detailed installation and setup instructions, refer to the Installation Guide.

## Contributing
We welcome contributions from the community. To contribute, please fork the repository, make your changes and submit a pull request.

## License
TrustSphere is open-source software licensed under the MIT license.


