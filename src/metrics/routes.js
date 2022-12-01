const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller');

const router = Router();

// Get Metrics
router.get('/', controller.getMetrics);
// Get Metric By ID
router.get('/:id', controller.getMetricById);
// Query Metric Aggregates
router.post('/aggregates', controller.aggregates);



module.exports = router;