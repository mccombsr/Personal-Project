INSERT INTO users
(users_name, users_auth_id, users_picture, users_email)
VALUES ($1, $2, $3, $4)
RETURNING *;