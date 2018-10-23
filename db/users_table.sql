CREATE TABLE users (
    users_id SERIAL PRIMARY KEY,
    users_name VARCHAR(180),
    users_auth_id TEXT,
    users_picture TEXT,
    users_email TEXT,
    business_account BOOLEAN,
    phone_number VARCHAR(25)
);




-- CREATE TABLE users (
--     users_id SERIAL PRIMARY KEY,
--     users_name VARCHAR(180),
--     users_auth_id TEXT,
--     users_picture TEXT,
--     users_email TEXT
-- );
