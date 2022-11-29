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
// Add Profile to List
router.post('/add-profile-to-list/:listId', controller.addProfileToList);
// Update List
router.put('/update-list', controller.updateList);
// Delete List
router.delete('/delete-list/:id', controller.deleteList);
// Delete profile from list
router.delete('/remove-from-list/:id', controller.removeFromList);




module.exports = router;