const express = require('express');
const router = express.Router();

const {RenderMain,RenderLogin,RenderRoom,Create_Room} = require('../controllers/main');

router.get('/',RenderMain );
router.get('/login',RenderLogin);

router.post('/rooms',RenderRoom);
router.post('/New_Room',Create_Room);









module.exports = router;