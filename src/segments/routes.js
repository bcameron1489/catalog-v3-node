const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller');

const router = Router();

// Get Segments

app.get('/', controller.getSegments);


module.exports = router;