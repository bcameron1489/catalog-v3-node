const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get('/', controller.getCatalogs);
router.post('/', controller.addItem);
router.get('/:id', controller.getItemById);
router.put('/:id', controller.updateItem);
router.delete('/:id', controller.removeItem);


module.exports = router;