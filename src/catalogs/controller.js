const pool = require('../../db')
const queries = require('./queries')

const getCatalogs = (req, res) => {
    pool.query(queries.getCatalogs, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getItemById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getItemById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getCatalogs,
    getItemById
}