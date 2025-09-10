
-- First enable the pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- The `update_timestamp` function should be defined to update the `updated_at` field:
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Auto-generated UUID for team ID
    team_name VARCHAR(255) NOT NULL                 -- Team name, required field
);



-- Trigger to update `updated_at` when a team is modified
CREATE TRIGGER update_team_modified
BEFORE UPDATE ON teams
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();


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

-- Add foreign key relationships and other columns to the teams table
ALTER TABLE teams
    ADD COLUMN team_lead_id UUID REFERENCES users(id),         -- Foreign key to users table for team lead
    ADD COLUMN team_manager_id UUID REFERENCES users(id),      -- Foreign key to users table for team manager
    --ADD COLUMN team_department_id UUID REFERENCES departments(id), -- Foreign key to departments table
    ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the team was created
    ADD COLUMN updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP; -- Timestamp for when the team was last updated
