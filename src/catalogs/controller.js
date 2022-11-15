const pool = require('../../db')

const getCatalogs = (req, res) => {
    pool.query("SELECT * FROM catalogs", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getCatalogs,
}