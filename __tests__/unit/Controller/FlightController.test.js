jest.mock('../../../app/Services/FlightService', () => {
  return {
    create: jest.fn(),
    bestFlight: jest.fn(),
  };
});

const FlightController = require('../../../app/Http/Controller/FlightController');

const FlightService = require('../../../app/Services/FlightService');

describe('flight controller validation', () => {
  test('creation', () => {
    const ctx = {
      request: {
        body: {},
      },
      status: 200,
    };

    const result = FlightController.create(ctx);

    expect(FlightService.create).toHaveBeenCalledWith(ctx.request.body);

    expect(result).toEqual(ctx);
  });


  test('best flight', () => {
    const ctx = {
      params: {
        to: 'foo',
        from: 'bar',
      },
      body: 'foo-bar',
      status: 200,
    };

    const result = FlightController.bestFlight(ctx);

    expect(FlightService.bestFlight)
        .toHaveBeenCalledWith(ctx.params.to, ctx.params.from);

    expect(result).toEqual(ctx);
  });
});
