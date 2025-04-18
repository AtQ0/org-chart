-- CREATE DB
CREATE DATABASE org_chart_db;

-- First enable the pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE titles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Optionally, to automatically update `updated_at` when a record is modified:
CREATE TRIGGER update_title_modified
BEFORE UPDATE ON titles
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- The `update_timestamp` function should be defined to update the `updated_at` field:
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Optionally, to automatically update `updated_at` when a record is modified:
CREATE TRIGGER update_role_modified
BEFORE UPDATE ON roles
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- The `update_timestamp` function should be defined to update the `updated_at` field:
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Auto-generated UUID for team ID
    team_name VARCHAR(255) NOT NULL                 -- Team name, required field
);

-- Add foreign key relationships and other columns to the teams table
ALTER TABLE teams
    ADD COLUMN team_lead_id UUID REFERENCES users(id),         -- Foreign key to users table for team lead
    ADD COLUMN team_manager_id UUID REFERENCES users(id),      -- Foreign key to users table for team manager
    --ADD COLUMN team_department_id UUID REFERENCES departments(id), -- Foreign key to departments table
    ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the team was created
    ADD COLUMN updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP; -- Timestamp for when the team was last updated


-- Trigger to update `updated_at` when a team is modified
CREATE TRIGGER update_team_modified
BEFORE UPDATE ON teams
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- The `update_timestamp` function to automatically update the `updated_at` field
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- bcrypt-hashed string
    image TEXT,
    title_id UUID REFERENCES titles(id),
    team_id UUID REFERENCES teams(id),
    manager_id UUID REFERENCES users(id),
    role_id UUID REFERENCES roles(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

------------------
--- MOCKED DATA---
------------------

-- mocked data for titles
INSERT INTO titles (id, title_name) VALUES
('11111111-1111-1111-1111-111111111111', 'engineering manager'),
('22222222-2222-2222-2222-222222222222', 'software engineer'),
('33333333-3333-3333-3333-333333333333', 'ux designer'),
('44444444-4444-4444-4444-444444444444', 'product manager'),
('55555555-5555-5555-5555-555555555555', 'qa engineer'),
('66666666-6666-6666-6666-666666666666', 'designer manager');


-- mocked data for teams
INSERT INTO teams (id, team_name) VALUES
('11111111-1111-1111-1111-111111111111', 'engineering team'),
('22222222-2222-2222-2222-222222222222', 'product team'),
('33333333-3333-3333-3333-333333333333', 'designer team');

-- mocked data for roles
INSERT INTO roles (id, role_name)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'employee'),
  ('22222222-2222-2222-2222-222222222222', 'team lead'),
  ('33333333-3333-3333-3333-333333333333', 'team manager'),
  ('44444444-4444-4444-4444-444444444444', 'department manager'),
  ('55555555-5555-5555-5555-555555555555', 'office manager'),
  ('66666666-6666-6666-6666-666666666666', 'admin');


-- Mocked data for users
INSERT INTO users (
    id, first_name, last_name, email, password, image, title_id, team_id, manager_id, role_id
) VALUES
-- New user with Admin role and Software Engineer title
(
    'f9a3843b-50e5-4bc6-a4a5-4a29b7efb9d9',  -- New UUID
    'james',
    'wilson',
    'james.wilson@example.com',
    '$2a$12$MDOWgbgDkttO7PJ1ZF.wAO/f15Jrciplu8iTKKvnv.RG2rvA.1mRa',  -- Hashed password (sommar2025)
    'https://example.com/images/james.jpg',
    '22222222-2222-2222-2222-222222222222', -- Software Engineer title
    '11111111-1111-1111-1111-111111111111', -- Engineering Team (example team)
    NULL,  -- No manager since they are an admin
    '66666666-6666-6666-6666-666666666666'  -- Admin role
),
-- Engineering Manager (Emma) - leads Team A & Team B
(
    '50e90240-898c-4567-a5ef-57a887f71498',
    'emma',
    'thompson',
    'emma.thompson@example.com',
    '$2a$12$MDOWgbgDkttO7PJ1ZF.wAO/f15Jrciplu8iTKKvnv.RG2rvA.1mRa',
    'https://example.com/images/emma.jpg',
    '11111111-1111-1111-1111-111111111111', -- Engineering Manager
    '11111111-1111-1111-1111-111111111111', -- Engineering Team
    NULL,
    '33333333-3333-3333-3333-333333333333' -- Team Manager
),
-- Team A: Engineering (reports to Emma)
(
    '42eb0b16-e092-43cd-b59d-e2c03fe13caf',
    'liam',
    'nguyen',
    'liam.nguyen@example.com',
    '$2a$12$MDOWgbgDkttO7PJ1ZF.wAO/f15Jrciplu8iTKKvnv.RG2rvA.1mRa',
    'https://example.com/images/liam.jpg',
    '22222222-2222-2222-2222-222222222222', -- Software Engineer
    '11111111-1111-1111-1111-111111111111', -- Engineering Team
    '50e90240-898c-4567-a5ef-57a887f71498',  -- Emma
    '11111111-1111-1111-1111-111111111111'  -- Employee
),
(
    'cafb008b-5db9-43f6-8974-e1c094dfb5f5',
    'sophia',
    'martinez',
    'sophia.martinez@example.com',
    '$2a$12$MDOWgbgDkttO7PJ1ZF.wAO/f15Jrciplu8iTKKvnv.RG2rvA.1mRa',
    'https://example.com/images/sophia.jpg',
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111', -- Engineering Team
    '50e90240-898c-4567-a5ef-57a887f71498',  -- Emma
    '11111111-1111-1111-1111-111111111111'  -- Employee
),
-- Team B: QA (also reports to Emma)
(
    '13590c7b-18fb-423f-aba5-f5cb751bddd0',
    'mason',
    'taylor',
    'mason.taylor@example.com',
    '$2a$12$MDOWgbgDkttO7PJ1ZF.wAO/f15Jrciplu8iTKKvnv.RG2rvA.1mRa',
    'https://example.com/images/mason.jpg',
    '55555555-5555-5555-5555-555555555555', -- QA Engineer
    '22222222-2222-2222-2222-222222222222', -- Product Team
    '50e90240-898c-4567-a5ef-57a887f71498',  -- Emma
    '33333333-3333-3333-3333-333333333333'   -- Team Manager
),
(
    '7d2360f4-3665-4fde-9dee-3d62dcaf3c47',
    'ava',
    'patel',
    'ava.patel@example.com',
    '$2a$12$MDOWgbgDkttO7PJ1ZF.wAO/f15Jrciplu8iTKKvnv.RG2rvA.1mRa',
    'https://example.com/images/ava.jpg',
    '55555555-5555-5555-5555-555555555555', -- QA Engineer
    '22222222-2222-2222-2222-222222222222', -- Product Team
    '50e90240-898c-4567-a5ef-57a887f71498',  -- Emma
    '33333333-3333-3333-3333-333333333333'   -- Team Manager
),
-- Product Manager (Olivia) - leads Team C
(
    '791273af-83fd-435a-a992-0f13eb958b7f',
    'olivia',
    'chen',
    'olivia.chen@example.com',
    '$2a$12$MDOWgbgDkttO7PJ1ZF.wAO/f15Jrciplu8iTKKvnv.RG2rvA.1mRa',
    'https://example.com/images/olivia.jpg',
    '44444444-4444-4444-4444-444444444444', -- Product Manager
    '33333333-3333-3333-3333-333333333333', -- Designer Team
    NULL,
    '44444444-4444-4444-4444-444444444444'   -- Department Manager
),
-- Team C: Product (reports to Olivia)
(
    '4fcd1efa-3490-4e7b-b683-03dfe700965e',
    'ethan',
    'garcia',
    'ethan.garcia@example.com',
    '$2a$12$MDOWgbgDkttO7PJ1ZF.wAO/f15Jrciplu8iTKKvnv.RG2rvA.1mRa',
    'https://example.com/images/ethan.jpg',
    '22222222-2222-2222-2222-222222222222', -- Software Engineer
    '33333333-3333-3333-3333-333333333333', -- Designer Team
    '791273af-83fd-435a-a992-0f13eb958b7f',  -- Olivia
    '11111111-1111-1111-1111-111111111111'  -- Employee
),
(
    'b3d9216d-aaed-42bd-97ab-823b3c7e5e02',
    'daniel',
    'lee',
    'daniel.lee@example.com',
    '$2a$12$MDOWgbgDkttO7PJ1ZF.wAO/f15Jrciplu8iTKKvnv.RG2rvA.1mRa',
    'https://example.com/images/daniel.jpg',
    '22222222-2222-2222-2222-222222222222', -- Software Engineer
    '33333333-3333-3333-3333-333333333333', -- Designer Team
    '791273af-83fd-435a-a992-0f13eb958b7f',  -- Olivia
    '11111111-1111-1111-1111-111111111111'  -- Employee
);
