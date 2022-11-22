const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller')

const router = Router();

// Get Tags
router.get('/', controller.getTags);
// flow tags
router.get('/flow/:id', controller.getFlowTags);

module.exports = router