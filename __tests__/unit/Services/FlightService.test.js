const flightService = require('../../../app/Services/FlightService');

const fs = require('fs');

jest.mock('fs');

const flightList = [
  [
    'GRU',
    'BRC',
    10,
  ],
  [
    'BRC',
    'SCL',
    5,
  ],
];

describe('test of flightService', () => {
  test('data persistence', () => {
    fs.appendFile.mockReturnValue(false);

    flightService.create(flightList);

    expect(fs.appendFile)
        .toHaveBeenCalledWith(
            'input-routes.csv',
            '\nGRU,BRC,10\nBRC,SCL,5',
            'utf8',
            expect.anything(),
        );
  });

  test('best flight', () => {
    fs.readFileSync.mockReturnValue(
        'GRU,BRC,10\nBRC,SCL,5\nGRU,CDG,75\nGRU,SCL,20\nGRU,ORL,56\nORL,CDG,5\nSCL,ORL,20',
    );

    expect(flightService.bestFlight('GRU', 'CDG'))
        .toMatchObject(
            {bestRoute: ['GRU', 'BRC', 'SCL', 'ORL', 'CDG'], price: 40},
        );

    expect(fs.readFileSync).toHaveBeenCalledWith('input-routes.csv', 'utf8');
  });
});


