CREATE TABLE business (
    business_id SERIAL PRIMARY KEY,
    users_id INTEGER REFERENCES users(users_id),
    business_name VARCHAR(180),
    business_picture TEXT,
    business_email TEXT,
    business_phone VARCHAR(25),
    business_blurb VARCHAR(5000),
    operating_zips VARCHAR(200)
);



-- CREATE TABLE business (
--     business_id SERIAL PRIMARY KEY,
--     users_id FOREIGN KEY,
--     business_name VARCHAR(180) NOT NULL,
--     business_picture TEXT,
--     business_email TEXT NOT NULL,
--     business_phone INTEGER NOT NULL,
--     business_blurb VARCHAR(5000),
--     operating_zips VARCHAR(200)
-- );