const jwt = require('jsonwebtoken')
const express = require("express");
const User = require("../models/users");
//token controller api
module.exports.token = async function (req, res) {

    const {user} = req.session;
    if (req.session.user) {
        const token = jwt.sign({
            "username": `${user._id}`,
            "nickname": `${user.username}`,
            "template": "default",
            "subject": "Test 1",
            "api": "https://cryptic-ravine-22890.herokuapp.com/api/report",
            "id": `${user._id + Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 1000000) + Date.now() + user._id}`


        }, "secret", {algorithm: 'HS256', expiresIn: "1h"})
//возвращаем созданный токен клиенту
        return res.send(token)
    }

}

//report controller api
module.exports.report = async function (req, res) {

    if (req.header('X-api-key') === 'secret')
        //записываем результат репорта в базу пользователя в поле result
        try {
            await User.findOneAndUpdate({ _id: req.body.id.substr(0, 24) }, {result: req.body })
            return res.status(200).send('report accepted')
        } catch
            (e) {
            res.send(e.message)
        }
}

module.exports.stayOn = async function (req, res) {

    if (req)
    try {


        return res.send("server online")
    }
catch (e) {e.message}
}
