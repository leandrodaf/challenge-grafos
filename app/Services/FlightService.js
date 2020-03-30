const fs = require('fs');
const Graph = require('../Dijkstra/Graph');

module.exports.create = (routeList) => {
  newRouters = '\n' + routeList.map((route) => route.join(',')).join('\n');

  fs.appendFile('input-routes.csv', newRouters, 'utf8',
      (err) => {
        if (err) throw err;
      },
  );
};

module.exports.bestFlight = (to, from) => {
  const inputRoutes = fs.readFileSync('input-routes.csv', 'utf8').split('\n');

  const flightList = sanitizeFlightList(inputRoutes);

  const map = new Graph();

  for (let index = 0; index < flightList.length; index++) {
    const flight = flightList[index];
    map.addStartingPoints(flight[0]);
    map.addStartingPoints(flight[1]);
  }

  for (let index = 0; index < flightList.length; index++) {
    const flight = flightList[index];
    map.addDestinationPoint(flight[0], flight[1], parseInt(flight[2]));
  }

  return map.findBestPrice(to, from);
};

const sanitizeFlightList = (inputRoutes) => {
  return inputRoutes.reduce((carry, route) => {
    const flight = route.split(',');

    if (flight.length === 3) {
      carry.push(flight);
    }

    return carry;
  }, []);
};
