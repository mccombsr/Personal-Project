UPDATE users
SET users_name = $2, users_phone = $3, users_email = $4
WHERE users_id = $1
RETURNING *;