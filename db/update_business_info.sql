UPDATE business
SET business_name = $2, business_phone = $3, business_email = $4, business_blurb = $5, operating_zips = $6
WHERE business_id = $1
RETURNING *;