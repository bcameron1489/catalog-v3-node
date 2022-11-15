const { Router } = require('express');
const controller = require('./controller')

const router = Router();


// Get Catlog
router.get('/', controller.getCatalogs);
// Create Catalog Item
router.post('/', controller.addItem);
// Get Catalog Item by ID
router.get('/:id', controller.getItemById);
// Update Catalog Item
router.put('/:id', controller.updateItem);
//  Delete Catalog Item
router.delete('/:id', controller.removeItem);


module.exports = router;