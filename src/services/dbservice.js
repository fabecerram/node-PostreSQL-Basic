
const Pool = require('pg').Pool;

const connection_data = {
    user:'postgres',
    host: 'localhost',
    database: 'tododb',
    password: 'newPassword',
    port: 5432
};

const pool = new Pool(connection_data);

module.exports = pool;