const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller')

const router = Router();


// Get Events
router.get('/', controller.getEvents);
// Get Event by ID
router.get('/:id', controller.getEventById);
// Create Event
router.post('/create-event', controller.createEvent);
// Get Event Metrics
router.get('/get-event-metrics', controller.getEventMetrics);


module.exports = router