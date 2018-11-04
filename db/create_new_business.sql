INSERT INTO business (users_id, business_picture)
VALUES ($1, 'https://i0.wp.com/hifadhiafrica.org/wp-content/uploads/2017/01/default-placeholder.png')
RETURNING *; 