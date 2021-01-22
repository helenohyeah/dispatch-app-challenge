import {
  findShortestDistanceNode,
  findNodesToVisit,
  visitNode,
  findShortestPath,
  findShortestRoute,
  generateDistances,
  generateNodes
} from '../routeHelpers';

describe('visitNode', () => {
  describe('given a start node', () => {
    const node = { 
      tasksToStart: [{ id: 1, isComplete: false }, { id: 2, isComplete: false}],
      tasksToEnd: []
    };

    test('it should mark all tasks as complete and add task ids to active tasks', () => {
      const tasks = [];
      const { visitedNode, activeTasks } = visitNode(node, tasks);
      expect(visitedNode.tasksToStart[0].isComplete).toEqual(true);
      expect(visitedNode.tasksToStart[1].isComplete).toEqual(true);
      expect(activeTasks).toEqual([1, 2]);
    });

    test('it should return any given tasks in addition to tasksToStart', () => {
      const tasks = [3];
      const { activeTasks } = visitNode(node, tasks);
      expect(activeTasks).toEqual(expect.arrayContaining([3]));
    });
  });

  describe('given an end node', () => {
    const node = {
      tasksToStart: [],
      tasksToEnd: [{ id: 1, isComplete: false }, { id: 2, isComplete: false}]
    };

    test('it should only mark tasks that match given tasks as complete and remove complete tasks from active tasks', () => {
      const tasks = [1];
      const { visitedNode, activeTasks } = visitNode(node, tasks);
      expect(visitedNode.tasksToEnd[0].isComplete).toEqual(true);
      expect(visitedNode.tasksToEnd[1].isComplete).toEqual(false);
      expect(activeTasks).toEqual([]);
    });
    
    test('it should not remove tasks that are not in tasksToEnd from active tasks', () => {
      const tasks = [1, 3];
      const { activeTasks } = visitNode(node, tasks);
      expect(activeTasks).toEqual([3]);
    })
  });

  describe('given a start and end node', () => {
    const node = {
      tasksToStart: [{ id: 3, isComplete: false }],
      tasksToEnd: [{ id: 1, isComplete: false }, { id: 2, isComplete: false}],
    };

    test('it should correctly update completed tasks and active tasks', () => {
      const tasks = [1];
      const { visitedNode, activeTasks } = visitNode(node, tasks);
      // Mark all tasksToStart as complete, return them as activeTasks
      expect(visitedNode.tasksToStart[0].isComplete).toEqual(true);
      // Mark matching tasksToEnd as complete, remove them from activeTasks
      expect(visitedNode.tasksToEnd[0].isComplete).toEqual(true);
      expect(visitedNode.tasksToEnd[1].isComplete).toEqual(false);
      expect(activeTasks).toEqual(expect.not.arrayContaining([1]));
    });

    test('it should not remove tasks that are not in tasksToEnd from active tasks', () => {
      const tasks = [1, 4];
      const { activeTasks } = visitNode(node,tasks);
      expect(activeTasks).toEqual(expect.arrayContaining([4]));
    });

    test('it should not pick up tasks that are already completed', () => {
      const node = {
        tasksToStart: [{ id: 3, isComplete: true }],
        tasksToEnd: [{ id: 1, isComplete: false }, { id: 2, isComplete: false}],
      };
      const tasks = [];
      const { activeTasks } = visitNode(node, tasks);
      expect(activeTasks).toEqual(expect.not.arrayContaining([3]));
    });
  });
});

describe('findNodesToVisit', () => {
  describe('given an empty list of tasks', () => {
    const nodes = {
      'A': {
        tasksToStart: [{ id: 1, isComplete: false }],
        tasksToEnd: [{ id: 3, isComplete: false }],
      },
      'B': {
        tasksToStart: [{ id: 2, isComplete: true }],
        tasksToEnd: [],
      },
      'C': {
        tasksToStart: [{ id: 3, isComplete: false }, { id: 4, isComplete: true }],
        tasksToEnd: [],
      },
      'D': {
        tasksToStart: [],
        tasksToEnd: [{ id: 1, isComplete: false }, { id: 2, isComplete: false }],
      }
    };
    const tasks = [];
    const nodesToVisit = findNodesToVisit(tasks, nodes);

    test('it should only include nodes with incomplete tasksToStart', () => {
      expect(Object.keys(nodesToVisit)).toEqual(expect.arrayContaining(['A', 'C']));
      expect(Object.keys(nodesToVisit)).toHaveLength(2);
    });

    test('it should not include nodes with only completed tasksToStart', () => {
      expect(Object.keys(nodesToVisit)).toEqual(expect.not.arrayContaining(['B']));
    });

    test('it should not include nodes with only tasksToEnd', () => {
      expect(Object.keys(nodesToVisit)).toEqual(expect.not.arrayContaining(['D']));
    });
  });

  describe('given a list of tasks', () => {
    const nodes = {
      'A': {
        tasksToStart: [{ id: 1, isComplete: false }],
        tasksToEnd: [{ id: 3, isComplete: true }],
      },
      'B': {
        tasksToStart: [{ id: 2, isComplete: true }, { id: 5, isComplete: true }],
        tasksToEnd: [{ id: 4, isComplete: false }],
      },
      'C': {
        tasksToStart: [{ id: 3, isComplete: true }, { id: 4, isComplete: true }],
        tasksToEnd: [],
      },
      'D': {
        tasksToStart: [],
        tasksToEnd: [{ id: 1, isComplete: false }, { id: 2, isComplete: false }],
      },
      'E': {
        tasksToStart: [],
        tasksToEnd: [{ id: 5, isComplete: false }]
      }
    };
    const tasks = [2, 4];
    const nodesToVisit = findNodesToVisit(tasks, nodes);

    test('it should include all nodes with incomplete tasksToStart', () => {
      expect(Object.keys(nodesToVisit)).toEqual(expect.arrayContaining(['A']));
    });

    test('it should include any nodes with tasksToEnd that can be completed', () => {
      expect(Object.keys(nodesToVisit)).toEqual(expect.arrayContaining(['B', 'D']));
    });

    test('it should not include nodes with only tasksToEnd that cannot be completed or only completed tasksToStart', () => {
      expect(Object.keys(nodesToVisit)).toEqual(expect.not.arrayContaining(['E']));
      expect(Object.keys(nodesToVisit)).toEqual(expect.not.arrayContaining(['C']));
    });
  });

});

describe('generateDistances', () => {
  const nodes = {
    'A': { coords: { lat: 45.502, lng: -73.567 }},
    'B': { coords: { lat: 45.422, lng: -75.697 }},
    'C': { coords: { lat: 43.813, lng: -79.495 }}
  };

  test('it should generate a hash map of nodes and its distance to all other nodes', () => {
    const result = {
      'A': { 'B': 166538, 'C': 505499 },
      'B': { 'A': 166538, 'C': 350159 },
      'C': { 'A': 505499, 'B': 350159 }
    };
    const distances = generateDistances(nodes);
    expect(distances).toEqual(result);
  });
});

describe('findShortestDistanceNode', () => {
  test('it should return the shortest distance node', () => {
    const start = { lat: 45.502, lng: -73.567 };
    const nodes = {
      'B': { coords: { lat: 45.422, lng: -75.697 }},
      'C': { coords: { lat: 43.813, lng: -79.495 }}
    };
    const { shortestDistanceNode, distance } = findShortestDistanceNode(start, nodes);
    expect(shortestDistanceNode).toEqual('B');
    expect(distance).toEqual(166538);
  });
});

describe('findShortestPath', () => {
  test('it should return correct path given two nodes', () => {
    const nodes = {
      'Toronto': {
        coords: { lat: 43.653, lng: -79.383 },
        tasksToStart: [{ id: 1, isComplete: false }],
        tasksToEnd: [{ id: 2, isComplete: false }],
      },
      'Montreal': {
        coords: { lat: 45.502, lng: -73.567 },
        tasksToStart: [{ id: 2, isComplete: false }],
        tasksToEnd: [{ id: 1, isComplete: false }],
      }
    };
    const startNode = {
      'Toronto': {
        coords: { lat: 43.653, lng: -79.383 },
        tasksToStart: [{ id: 1, isComplete: false }],
        tasksToEnd: [{ id: 2, isComplete: false }],
      }
    };
    const { pathDistance, path } = findShortestPath(startNode, nodes);
    const pathNames = path.map(node => Object.keys(node)[0]);
    expect(pathNames).toEqual(['Toronto', 'Montreal', 'Toronto']);
    expect(pathDistance).toEqual(1009712);
  });

  test('it should return correct path given three nodes', () => {
    const nodes = {
      'Toronto': {
        coords: { lat: 43.653, lng: -79.383 },
        tasksToStart: [],
        tasksToEnd: [{ id: 2, isComplete: false }],
      },
      'Montreal': {
        coords: { lat: 45.502, lng: -73.567 },
        tasksToStart: [{ id: 2, isComplete: false }, { id: 3, isComplete: false }],
        tasksToEnd: [{ id: 1, isComplete: false }],
      },
      'Ottawa': {
        coords: { lat: 45.422, lng: -75.697 },
        tasksToStart: [{ id: 1, isComplete: false }],
        tasksToEnd: [{ id: 3, isComplete: false }],
      }
    };
    const startNode = {
      'Ottawa': {
        coords: { lat: 45.422, lng: -75.697 },
        tasksToStart: [{ id: 1, isComplete: false }],
        tasksToEnd: [{ id: 3, isComplete: false }],
      }
    };
    const { pathDistance, path } = findShortestPath(startNode, nodes);
    const pathNames = path.map(node => Object.keys(node)[0]);
    expect(pathNames).toEqual(['Ottawa', 'Montreal', 'Ottawa', 'Toronto']);
    expect(pathDistance).toEqual(685609);
  });
});