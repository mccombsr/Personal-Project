UPDATE business
SET business_picture = $2
WHERE business_id = $1;
SELECT * FROM business
WHERE business_id = $1;