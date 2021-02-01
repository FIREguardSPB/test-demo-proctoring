const express = require("express");
const {sessionChecker} = require("../middleware/auth");
const router = express.Router();
const controller = require('../controllers/index')

router
    .route('')
    .get(sessionChecker, controller.indexPage)

router
    .route('/signup')
    .get(sessionChecker, controller.signupPage)
    .post(controller.signup)

router
    .route("/login")
    .get(sessionChecker, controller.loginPage)
    .post(controller.login);

router
    .route("/dashboard")
    .get(controller.dashboardPage);

router
    .route("/logout")
    .get(controller.logout);


module.exports = router;
