-- Create the TrustSphere keyspace
CREATE KEYSPACE IF NOT EXISTS TrustSphere WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

-- Use the TrustSphere keyspace
USE TrustSphere;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    name text,
    surname text,
    email text PRIMARY KEY,
    password text,
    location text,
    profile_picture text
);

-- Create the trusttrail table
CREATE TABLE IF NOT EXISTS trusttrail (
    user text,
    transaction_history text,
    PRIMARY KEY (user)
);

-- Create the marketplace table
CREATE TABLE IF NOT EXISTS marketplace (
    services text,
    active_transactions text,
    PRIMARY KEY (services)
);

-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
    name text,
    owner text,
    status text,
    votings text,
    service_requests text,
    active_transactions text,
    PRIMARY KEY (name)
);

-- Create the voting table
CREATE TABLE IF NOT EXISTS voting (
    choices text,
    votes text,
    PRIMARY KEY (choices)
);

-- Create the invitation table
CREATE TABLE IF NOT EXISTS invitation (
    code text,
    email text PRIMARY KEY
);
