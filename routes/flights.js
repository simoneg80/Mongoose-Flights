var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


//GET /flights/index
router.get('/', flightsCtrl.index);

//GET /flights/new
router.get('/new', flightsCtrl.new);

//SHOW /flights/:id
router.get('/:id', flightsCtrl.show);

//Create /flights
router.post('/', flightsCtrl.create);

//POST /flights/:id/destinations
router.post('/:id', flightsCtrl.addDestination);

//GET /flights/:id/tickets/new
router.get('/:id/tickets/new', flightsCtrl.newTicket);

router.post('/:id/tickets', flightsCtrl.createTicket);

router.delete('/:flightId/tickets/:id', flightsCtrl.delete);

module.exports = router;
