const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller')

const router = Router();


// Get Events
router.get('/', controller.getEvents);
// Create Event
router.post('/create-event', controller.createEvent);


module.exports = router