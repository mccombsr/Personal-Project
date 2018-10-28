SELECT b.business_name, u.users_name, r.review   
FROM reviews r
JOIN business b ON r.business_id = b.business_id
JOIN users u ON r.users_id = u.users_id
WHERE b.business_id = $1;


-- THIS ALSO INCLUDES THE BUSINESSID/ USERS ID OF THE BUSINESS OWNER AS WELL AS THE USERS ID OF THE REVIEWER.--

-- SELECT b.business_id, b.users_id, b.business_name, u.users_name, u.users_id, r.review   
-- FROM reviews r
-- JOIN business b ON r.business_id = b.business_id
-- JOIN users u ON r.users_id = u.users_id
-- WHERE b.business_id = 22;