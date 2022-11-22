const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller')

const router = Router();

// Get Tags
router.get('/', controller.getTags);
// Get Tag by Id
router.get('/:id', controller.getTagById);
// flow tags
router.get('/flow/:id', controller.getFlowTags);
// list tags
router.get('/list/:id', controller.getListTags);
// segments tags
router.get('/segment/:id', controller.getSegmentTags);

module.exports = router