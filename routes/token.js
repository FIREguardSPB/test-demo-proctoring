const router = require('express').Router();
const controller = require('../controllers/api')

router
    .route('')
    .get(controller.token)

module.exports = router