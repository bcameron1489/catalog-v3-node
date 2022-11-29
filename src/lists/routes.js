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
// Get List Profile Relationships
router.get('/get-list-relationships/:id', controller.getListRelationships);
// Create List
router.post('/create-list', controller.createList);
// Update List
router.put('/update-list', controller.updateList);




module.exports = router;