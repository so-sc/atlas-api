const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Route'
    });
});

module.exports = router;
