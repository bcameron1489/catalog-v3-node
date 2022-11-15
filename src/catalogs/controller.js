const pool = require('../../db')
const queries = require('./queries')

const getCatalogs = (req, res) => {
    pool.query(queries.getCatalogs, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addItem = (req, res) => {
    const { title, url, image_url, descriptions } = req.body;
    // Check if title exists
    pool.query(queries.checkTitleExists, [title] , (error, results) => {
        if (results.rows.length) {
            res.send('title already exists')
        }

        // Add item to catalogs
        pool.query(
            queries.addItem, 
            [title, url, image_url, descriptions], 
            (error, results) => {
                if (error) throw error;
                res.status(201).send("Item Created Successfully")
                console.log("Item Created")
        })
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
    getItemById,
    addItem,
}