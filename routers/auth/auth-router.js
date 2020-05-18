const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model");

const { isValid } = require("../auth/users-service");

router.post("/register", (req, res) => {
    const { username, password } = req.body;
    const credentials = { username, password }

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                req.session.loggedIn === true;
                res.status(201).json({ dat: user });
            })
            .catch(error => {
                console.log({ error })
                res.status(500).json({ message: error.message });
            })
    } else {
        res.status(400).json({ message: "Please provide username and password, the password should be alphanumeric." })
    }
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid( {username, password} )) {
        Users.findBy({ username: username})
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    req.session.loggedIn = true;
                    req.session.user = user;

                    res.status(200).json({ message: "Welcome to our API." })
                } else {
                    res.status(401).json({ message: "Invalid credentials." })
                }
            })
            .catch(error => {
                console.log({ error })
                res.status(500).json({ message: error.message });
            })
    } else {
        console.log({ error })
        res.status(400).json({ message: "Please provide username and password, the password should be alphanumeric." })
    }
})

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({ message: "We could not log you out, please try again." })
            } else {
                res.status(204).end()
            }
        })
    } else {
        res.status(204).end();
    }
})

module.exports = router;