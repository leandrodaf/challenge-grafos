const PriorityQueue = require('../../../app/Dijkstra/PriorityQueue');

describe('test of Dijkstra algorithm PriorityQueue', () => {
  test('check empty queue functionality', () => {
    const priorityQueue = new PriorityQueue();

    expect(priorityQueue.isEmpty()).toEqual(true);
  });

  test('check enqueue functionality', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.enqueue(['GRU', 0]);

    expect(priorityQueue.isEmpty()).toEqual(false);
  });

  test('check dequeue functionality', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.enqueue(['GRU', 0]);
    priorityQueue.dequeue();

    expect(priorityQueue.isEmpty()).toEqual(true);
  });
});
