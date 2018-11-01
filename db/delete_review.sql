DELETE FROM reviews
WHERE review_id = $1;
SELECT * FROM reviews
WHERE users_id = $2;