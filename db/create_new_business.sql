INSERT INTO business (users_id)
VALUES ($1)
RETURNING *; 