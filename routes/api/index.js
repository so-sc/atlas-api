var express = require('express');
var router = express.Router();


router.use('/v1', require('./v1'));

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API V1'
    });
});


module.exports = router;
