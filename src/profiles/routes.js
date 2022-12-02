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
// Get Profile Segments
router.get('/get-profile-segments/:id', controller.getProfileSegments);
// Get Profile Relationships
router.get('/get-profile-relationships/:id/:type', controller.getProfileRelationships);
// Create Profile
router.post('/create-profile', controller.createProfile);



module.exports = router;