const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller');

const router = Router();

// Get Segments
router.get('/', controller.getSegments);
// Get Segment By ID
router.get('/:id', controller.getSegmentById);
// Get Segment Profiles
router.get('/get-segment-profiles/:id', controller.getSegmentProfiles);


module.exports = router;