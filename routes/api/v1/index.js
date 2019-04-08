const express = require('express');
const router = express.Router();
const verify = require('../../../middlewares/verify');


//========= Available API Routes ===========
const authRoute      = require('./auth.route');
const registerRoute  = require('./register.route');
const loginRoute     = require('./login.route');
const eventsRoute    = require('./events.route');

//======== Register the API routes
router.get('/', (req, res) => {
    res.status(200)
        .json({
            API: "v1"
        });
})
router.use('/auth', authRoute);
router.use('/login', loginRoute);
router.use('/register', registerRoute);
router.use('/events', eventsRoute);

module.exports = router;