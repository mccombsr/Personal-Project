CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES business(business_id),
    users_id INTEGER REFERENCES users(users_id),
    review VARCHAR(5000)
);