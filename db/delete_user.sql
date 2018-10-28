DELETE FROM reviews
WHERE users_id = $1;
DELETE FROM users
WHERE users_id = $1;


