const express = require("express");
const helmet = require("helmet");
const session = require("express-session");

const UsersRouter = require('./routers/users/users-router');
const AuthRouter = require('./routers/auth/auth-router');

const server = express();

const sessionConfig = {
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.env.SECURE_COOKIE || false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name: "monster",
    secret: process.env.COOKIE_SECRET || "secret",
}

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());

function isLoggedIn(req, res, next) {
    if(req.session.loggedIn) {
        next()
    } else {
        res.status(401).json({ message: "Must be logged in." })
    }
}

server.use("/api/users", isLoggedIn, UsersRouter),
server.use("/api/auth", AuthRouter),

module.exports = server;