const getCatalogs = "SELECT * FROM catalogs";
const getItemById = "SELECT * FROM catalogs WHERE id = $1";
const checkTitleExists = "SELECT s FROM catalogs s WHERE s.title = $1";
const addItem = "INSERT INTO catalogs (title, url, image_url, descriptions) VALUES ($1, $2, $3, $4)"

module.exports = {
    getCatalogs,
    getItemById,
    checkTitleExists,
    addItem,
}