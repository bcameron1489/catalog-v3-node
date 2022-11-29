const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller');

const router = Router();

// Get Lists
router.get('/', controller.getLists);
// Get List By ID
router.get('/:id', controller.getListById);
// Get List Profiles
router.get('/get-list-profiles/:id', controller.getListProfiles);




module.exports = router;