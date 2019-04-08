const express =  require('express');
const router = express.Router();
const verify = require('../../../middlewares/verify');
const eventController = require('../../../controllers/event.controller');

router.get('/', verify.basic, (req, res) => {
    return res.status(200)
                .json({
                    message: "Events Route"
                });
});

/**
 * Get the list of all events in the Databse
 */
router.get('/all', verify.basic, (req, res) => {

})

/**
 * Endpoint to register a user to an event
 * BASIC user Auth required
 */
router.post('/register/:event_id', verify.basic, (req, res) => {

})

/** ============================================================================
*             REQUIRES ADMIN ACCESS TO COMPLETE THE ACTIONS
* ==============================================================================
*/
/**
 * Endpoint to create a new Event
 * Requires ADMIN Access
 */
router.post('/create', verify.admin, (req, res) => {

})

/**
 * Endpoint to update an existing event
 * Requires ADMIN Access
 */
router.post('/update/:event_id', verify.admin, (req, res) => {

})

/**
 * Endpoint to delete an existing event
 * Requires ADMIN access
 */
router.post('/delete/:event_id', verify.admin, (req, res) => {

})

module.exports = router;