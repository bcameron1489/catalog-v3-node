const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller');

const router = Router();

// Get Segments

router.get('/', controller.getSegments);


module.exports = router;