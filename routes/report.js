const router = require('express').Router();
const controller = require('../controllers/api')

router
    .route('')
    .post(controller.report)

module.exports = router