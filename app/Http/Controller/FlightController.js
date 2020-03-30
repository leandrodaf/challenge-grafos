const FlightService = require('../../Services/FlightService');

module.exports.create = (ctx, next) => {
  const payload = ctx.request.body;

  FlightService.create(payload);

  ctx.status = 200;

  return ctx;
};

module.exports.bestFlight = (ctx, next) => {
  const {to, from} = ctx.params;

  ctx.status = 200;
  ctx.body = FlightService.bestFlight(to, from);

  return ctx;
};
