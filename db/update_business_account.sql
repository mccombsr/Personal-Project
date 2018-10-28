UPDATE users
SET business_account = $2
WHERE users_id = $1
RETURNING *;
