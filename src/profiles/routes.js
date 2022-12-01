const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller');

const router = Router();

// Get Profiles
router.get('/', controller.getProfiles);
// Get Profile By Id
router.get('/:id', controller.getProfileById);



module.exports = router;