const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "catalogs",
    password: "Bsc281734!",
    port: 5432,
});

module.exports = pool;