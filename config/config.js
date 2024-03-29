
if (process.env.NODE_ENV === 'production') {
	require('env2')('./.env.prod');
} else {
	require('env2')('./.env');
}

const env = process.env;

module.exports = {
  "development": {
    "username": env.MYSQL_USERNAME,
    "password": env.MYSQL_PASSWORD,
    "database": env.MYSQL_DB_NAME,
    "host": env.MYSQL_HOST,
    "dialect": "mysql",
    "operatorsAliases": false,
    'jwtSecret': env.JWT_SECRET
  },
  "production": {
    "username": env.MYSQL_USERNAME,
    "password": env.MYSQL_PASSWORD,
    "database": env.MYSQL_DB_NAME,
    "host": env.MYSQL_HOST,
    "port": env.MYSQL_PORT,
    "dialect": "mysql",
    "operatorsAliases": false,
    'jwtSecret': env.JWT_SECRET
  }
}
