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
                if (error) {
                    throw error;
                } else {
                    res.status(201).send("Item Created Successfully")
                    console.log(results.rows)


                    //  *****  Start Klaviyo Call
                    const jsonData = results.rows[0]
                    console.log(jsonData)
                    const data = jsonData


                    const url = 'https://a.klaviyo.com/api/catalog-items/';
                    const options = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        revision: '2022-10-17',
                        'content-type': 'application/json',
                        Authorization: 'Klaviyo-API-Key pk_9a80e7e4588264bf946559b8fe0e748095'
                    },
                    body: JSON.stringify({
                        data: {
                        type: 'catalog-item',
                        attributes: {
                            integration_type: '$custom',
                            images: [`${data.image_url}`],
                            external_id: `${data.id}`,
                            title: `${data.title}`,
                            description: `${data.descriptions}`,
                            url: `${data.url}`,
                            image_full_url: `${data.image_url}`
                        }
                        }
                    })
                    };

                    fetch(url, options)
                    .then(res => res.json())
                    .then(json => console.log(json))
                    .catch(err => console.error('error:' + err));
                    console.log('request url structure: ' + url)
                }
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

        pool.query(queries.updateItem, [title, id], (error, results) => {
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