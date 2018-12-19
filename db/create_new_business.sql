INSERT INTO business (users_id, business_picture)
VALUES ($1, 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552')
RETURNING *; 