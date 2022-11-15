const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get('/', controller.getCatalogs);
router.get('/:id', controller.getItemById);

module.exports = router;