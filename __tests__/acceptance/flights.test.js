const app = require('../../app/index');
const request = require('request-promise');

describe('flight controller integration', () => {
  let server = {};

  beforeEach(() => {
    server = app.listen(8888);
  });

  afterEach(() => {
    server.close();
  });

  test('/flights/routes/to/:to/from/:from', async () => {
    const reponse = await request({uri: 'http://localhost:8888/flights/routes/to/GRU/from/CDG'});

    expect(JSON.parse(reponse))
        .toMatchObject(
            {'bestRoute': ['GRU', 'BRC', 'SCL', 'ORL', 'CDG'], 'price': 40},
        );
  });

  test('/flights/routes', async () => {
    const response = await request.post({
      uri: 'http://localhost:8888/flights/routes',
      json: [
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
        [
          'GRU',
          'CDG',
          75,
        ],
        [
          'GRU',
          'SCL',
          20,
        ],
        [
          'GRU',
          'ORL',
          56,
        ],
        [
          'ORL',
          'CDG',
          5,
        ],
        [
          'SCL',
          'ORL',
          20,
        ],
      ],
      resolveWithFullResponse: true,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('OK');
  });
});
