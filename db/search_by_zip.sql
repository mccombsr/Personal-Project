SELECT * FROM business 
WHERE operating_zips ~* $1;