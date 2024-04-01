const express = require('express');
const router = express.Router();
const passport = require('passport');

const {Auth_sejong,} = require('../controllers/auth');

router.post('/auth_sejong',Auth_sejong);
router.post('/auth_sejong/callback')


module.exports = router;