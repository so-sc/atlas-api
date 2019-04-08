const User = require('../models/user.model');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET || require('../utils/config').JWT_SECRET;


/* Validations for registrations */
exports._register_checks = [
    check('email').isEmail().exists(),
    check('password').isLength({min: 6}).exists(),
    check('name').isLength({min: 4}).exists(),
    check('phone').isMobilePhone().isLength({min: 10}).exists(),
    check('gender').isAlpha().exists(),
    check('year').isNumeric().exists(),
    check('college').exists().isLength({ min: 4, max: 60 }),
    check('branch').exists().isLength({ min: 3, max: 50 })
];
exports.register = function (req, res) {

    //check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const userData = req.body;
    const user = new User({
        email: userData.email,
        password: userData.password,
        profile: {
            name: userData.name,
            phone: userData.phone,
            gender: userData.gender,
            year: userData.year,
            college: userData.college,
            branch: userData.college
        }
    });

    user.save().then(doc => {
        return res.status(200).json({
            message: `Success! Successfully registered`,
            id: doc._id
        });
    }).catch(err => {
        return res.status(409).json({
            message: `Registration failed`,
            error: err
        });
    });    
} 


//============================================================================================

/* Validating login checks */
exports._logIn_checks = [
    check('email').isEmail().exists(),
    check('password').isLength({min: 6}).exists()
];
exports.logIn = function (req, res) {
    //check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    User.findOne({ email: req.body.email }).then( user => {
        // if the document is empty
        if(!user) throw new Error('No accounts found');

        // compare the password
        user.comparePassword(req.body.password).then( isMatch => {
            if (!isMatch) {
                throw new Error("No users found");
            }
            // sign a json web token
            let token = jwt.sign( { 
                id: user._id, 
                email: user.email,
                auth_date: Date.now(), 
                type: user.admin ? "admin" : "user",
            }, jwt_secret, {
                expiresIn: 604800 // valid till a week
            });

            return res.status(200).json({
                message: 'Successfully Signed In',
                token
            });
        }).catch( err => { // wrong password
            return res.status(403).json({
                message: 'Invalid Username or password'
            });
        });
    }).catch( err => { // no account found for the given details
        return res.status(402).json({
            message: 'No account found for the email'
        });
    });
}
