
SELECT r.review_id, b.business_name, u.users_name, r.review   
FROM reviews r
JOIN business b ON r.business_id = b.business_id
JOIN users u ON r.users_id = u.users_id
WHERE u.users_id = $1;