CREATE TABLE business (
    business_id SERIAL PRIMARY KEY,
    business_name VARCHAR(180) NOT NULL,
    business_auth_id TEXT,
    business_picture TEXT,
    business_email TEXT NOT NULL,
    business_phone INTEGER NOT NULL,
    business_info VARCHAR(5000),
    operating_zips VARCHAR(200)
);