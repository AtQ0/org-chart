-- CREATE DB
CREATE DATABASE org_chart_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Changed from UUID to VARCHAR(255)
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);



------------------
--- MOCKED DATA---
------------------

INSERT INTO users (first_name, last_name, email, password)
VALUES
  ('John', 'Doe', 'john.doe@example.com', '$2a$12$0HyQEnL7AEOD6VDwneeuZOUqWciC9qs1ygo9hT72TFhcmK5xbjBD2'),
  ('Jane', 'Smith', 'jane.smith@example.com', '$2a$12$CaKbhBbVMmsWR6GU2pCniOFMVQcz6Gigv2a5O2RNzbowW1IUiwVsW'),
  ('Alice', 'Johnson', 'alice.johnson@example.com', '$2a$12$lMRuN2xYcWWD0lpMJeo7oOPrQxJedORtPvc7.4va8V0tilob/BfqO'),
  ('Bob', 'Williams', 'bob.williams@example.com', '$2a$12$iZ81gZgdHsLBkdcUqZksfuTFYEg751hbEGd0T86a01gi.kICxrFsy'),
  ('Charlie', 'Brown', 'charlie.brown@example.com', '$2a$12$2OK6AGywxhzIwxbh671aoOAtyARPTo2.Lvw4UCK4jLxtA6VTfP1.a'),
  ('David', 'Wilson', 'david.wilson@example.com', '$2a$12$NdZxe3.oSJIldiEUr5X3FuXU0/S66XIMo1fH5JxNcTm.MaP4XU0pW'),
  ('Eve', 'Davis', 'eve.davis@example.com', '$2a$12$vOeAVEHW4xZ/nO3sTfXEiuMA27gWew5q4A/BNBMHqKtbwuLOhnWM6');
