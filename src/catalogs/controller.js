const pool = require('../../db')
const queries = require('./queries')


// ********  HANDLE DATABASE QUERIES   ********** //



//  Get all catalog items in DB
const getCatalogs = (req, res) => {
    pool.query(queries.getCatalogs, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}


//  Add an item to DB
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

//  Get specific catalog item by ID from DB
const getItemById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getItemById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const removeItem = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getItemById, [id], (error, results) => {
        const noItemFound = !results.rows.length;
        if (noItemFound) {
            res.send('Item does not exist in the database.')
        }

        pool.query(queries.removeItem, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Item Removed Successfully");
        })
        
    })
}

const updateItem = (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;

    pool.query(queries.getItemById, [id], (error, results) => {
        const noItemFound = !results.rows.length;
        if (noItemFound) {
            res.send('Item does not exist in the database.')
        }

        pool.query(queries.updateItem, [title], (error, results) => {
            if (error) throw error;
            res.status(200).send("Item Updated successfully")
        })
    })
}

module.exports = {
    getCatalogs,
    getItemById,
    addItem,
    removeItem,
    updateItem,
}