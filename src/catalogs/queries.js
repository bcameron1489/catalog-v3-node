const getCatalogs = "SELECT * FROM catalogs";
const getItemById = "SELECT * FROM catalogs WHERE id = $1";

module.exports = {
    getCatalogs,
    getItemById,
}