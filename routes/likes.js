const express = require('express');

const router = express.Router();
const likesContoller = require('../controllers/likes_contoller');

router.post('/toggle', likesContoller.toggleLike);


module.exports = router;