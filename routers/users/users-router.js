const router = require("express").Router();

const Users = require("./users-model");

function restricted(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        res.status(401).json({ message: "Restricted Access. Please log in." })
    }
}

router.use(restricted);

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ data: users })
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: error.message })
        })
})

module.exports = router;