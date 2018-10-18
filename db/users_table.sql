CREATE TABLE users (
    users_id SERIAL PRIMARY KEY,
    users_name VARCHAR(180),
    users_auth_id TEXT,
    users_picture TEXT,
    users_email TEXT,
    business_account BOOLEAN
);




-- CREATE TABLE users (
--     users_id SERIAL PRIMARY KEY,
--     users_name VARCHAR(180),
--     users_auth_id TEXT,
--     users_picture TEXT,
--     users_email TEXT
-- );
