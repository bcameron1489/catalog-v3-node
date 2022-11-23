const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller')

const router = Router();


// Get Events

router.get('/', controller.getEvents);


module.exports = router