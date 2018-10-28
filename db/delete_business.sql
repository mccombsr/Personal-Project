-- Note that I can't seem to get this to work, no matter what order I put it in...

DELETE FROM reviews
WHERE business_id = $1;
DELETE FROM business
WHERE users_id = $2;
DELETE FROM users
WHERE users_id = $2;