const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller');

const router = Router();

// Get Lists
router.get('/', controller.getLists);




module.exports = router;