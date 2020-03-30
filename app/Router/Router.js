const Router = require('koa-router');

const FlightController = require('../Http/Controller/FlightController');

const router = new Router();

router.post('/flights/routes', FlightController.create);

router.get('/flights/routes/to/:to/from/:from', FlightController.bestFlight);


module.exports = router;
