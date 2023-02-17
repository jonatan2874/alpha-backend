/*
 * auth routes
 * host + /api/auth
 */
const { Router } = require('express');
const router = Router();

const {create_user} = require('../controllers/auth')

router.get('/new',create_user);

module.exports = router;