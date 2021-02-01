const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const saltRounds = 10;


//index main
module.exports.indexPage = async (req, res) => {
    res.redirect("/login");
}

//signup
module.exports.signupPage = async (req, res) => {
    res.render("signup");
}
module.exports.signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const user = new User({
            username,
            email,
            password: await bcrypt.hash(password, saltRounds)
        });
        await user.save();
        req.session.user = user;
        res.redirect("/dashboard");
    } catch (error) {
        next(error);
    }
}
// login page
module.exports.loginPage = async (req, res) => {
    res.render("login");
}
module.exports.login = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;
        res.redirect("/dashboard");
    } else {
        res.redirect("/login");
    }
}
//Личный кабинет

module.exports.dashboardPage = async (req, res) => {
    const {user} = req.session;
    if (req.session.user) {
        const resultReport = await User.findOne({_id: user._id})

        if (resultReport.result) {
            res.render("dashboard", {
                name: user.username,
                idSession: resultReport.result.id,
                statusTest: resultReport.result.status,
                beginTest: `${resultReport.result.startedAt.substring(0, 10)}  ${resultReport.result.startedAt.substring(11, 19)}`,
                endTest: `${resultReport.result.stoppedAt.substring(0, 10)}  ${resultReport.result.stoppedAt.substring(11, 19)}`,
                linkResult: resultReport.result.link,
                conclusionTest: resultReport.result.conclusion
            });
        } else {
            res.render("dashboard", {name: user.username})
        }

    } else {
        res.redirect("/login");
    }
}


//logout
module.exports.logout = async (req, res, next) => {
    if (req.session.user) {
        try {
            await req.session.destroy();
            res.clearCookie("user_sid");
            res.redirect("/");
        } catch (error) {
            next(error);
        }
    } else {
        res.redirect("/login");
    }
}
