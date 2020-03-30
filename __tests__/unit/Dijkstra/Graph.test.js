const Graph = require('../../../app/Dijkstra/Graph');

describe('test of Dijkstra algorithm Graph', () => {
  test('check function add starting Points', () => {
    const graph = new Graph();

    expect(graph.addStartingPoints('foo')).toBeUndefined();
  });

  test('add destination point with starting Points', () => {
    const graph = new Graph();

    graph.addStartingPoints('foo');
    graph.addStartingPoints('bar');

    expect(graph.addDestinationPoint('foo', 'bar', 10)).toBeUndefined();
  });

  test('add destination point with starting Points', () => {
    const graph = new Graph();

    graph.addStartingPoints('foo');
    graph.addStartingPoints('bar');
    graph.addStartingPoints('foo-bar');

    graph.addDestinationPoint('foo', 'foo-bar', 5);
    graph.addDestinationPoint('foo', 'bar', 12);
    graph.addDestinationPoint('foo-bar', 'bar', 5);


    expect(graph.findBestPrice('foo', 'bar', 10))
        .toMatchObject({bestRoute: ['foo', 'foo-bar', 'bar'], price: 10});
  });
});
