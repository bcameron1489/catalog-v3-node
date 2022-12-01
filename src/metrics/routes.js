const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller');

const router = Router();

// Get Metrics
router.get('/', controller.getMetrics);



module.exports = router;