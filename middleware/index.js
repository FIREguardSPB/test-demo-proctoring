module.exports = function (app) {
    const express = require("express");
    const morgan = require("morgan");
    const cookieParser = require("cookie-parser");
    const session = require("express-session");
    const path = require("path");
    const FileStore = require("session-file-store")(session);
    const {cookiesCleaner} = require("./auth");
    const dbConnection = require("./db-connect");
    const fetch = require('node-fetch');
    app.use(morgan("dev"));

    // Body POST запросов.
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    // initialize cookie-parser to allow us access the cookies stored in the browser.
    app.use(cookieParser());

    // initialize express-session to allow us track the logged-in user across sessions.
    app.use(
        session({
            store: new FileStore(),
            key: "user_sid",
            secret: "anything here",
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: 600000
            }
        })
    );

    app.use(cookiesCleaner);

    // Подключаем статику
    app.use(express.static(path.join(__dirname, '..', "public")));

    // Подключаем views(hbs)
    app.set("views", path.join(__dirname, '..', "views"));
    app.set("view engine", "hbs");

//Не даем заснуть приложению на сервере heroku, каждые 20 минут "пинаем" запросом сам на себя.
    setInterval(async () => {
        fetch('https://cryptic-ravine-22890.herokuapp.com/api/stayOnline')
            .then(res => res.text())
            .then(body => console.log(body));
    }, 1000 * 60 * 20)

};
