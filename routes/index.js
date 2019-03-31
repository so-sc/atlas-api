const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));

router.get('/', (req, res) => {
    res.status(200).json({
        API: 'Routes'
    });
});

module.exports = router;
