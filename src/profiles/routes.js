const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller');

const router = Router();

// Get Profiles
router.get('/', controller.getProfiles);
// Get Profile By Id
router.get('/:id', controller.getProfileById);
// Get Profile Lists
router.get('/get-profile-lists/:id', controller.getProfileLists);



module.exports = router;