CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(180) NOT NULL,
    customer_auth_id TEXT NOT NULL,
    customer_picture TEXT,
    customer_email TEXT,
    customer_phone INTEGER
);