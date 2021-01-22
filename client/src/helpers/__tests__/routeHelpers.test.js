import {
  findShortestDistanceNode,
  findNodesToVisit,
  visitNode,
  findShortestPath,
  findShortestRoute,
  generateDistances,
  generateNodes
} from '../routeHelpers';

// Hash map of each node and its coordinates, if its a start node, and tasks
const mockNodes = {
  'A': {
    coords: { lat: 1, lng: 1 },
    isStart: true, // don't need. use length of tasksToStart/End
    tasksToStart: [{ id: 1, isComplete: false }],
    tasksToEnd: [{ id: 3, isComplete: false }],
  },
  'B': {
    coords: { lat: 2, lng: 6 },
    tasksToStart: [{ id: 2, isComplete: false }],
    tasksToEnd: [],
  },
  'C': {
    coords: { lat: 5, lng: 1 },
    tasksToStart: [{ id: 3, isComplete: false }],
    tasksToEnd: [],
  },
  'D': {
    coords: { lat: 6, lng: 3 },
    tasksToStart: [],
    tasksToEnd: [{ id: 1, isComplete: false }, { id: 2, isComplete: false }],
  },
};

// Hash map of each node and it's distance to all other nodes
const mockDistances = {
  'start': { 'B': 5.1, 'C': 4, 'D': 6.3 },
  'B': { 'start': 5.1, 'C': 5.8, 'D': 5.8 },
  'C': { 'start': 5, 'B': 5.8, 'D': 2.8 },
  'D': { 'start': 6.3, 'B': 5.8, 'C': 2.8 }
};

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
      expect(activeTasks).toEqual(expect.arrayContaining([1, 2]));
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
      expect(activeTasks).toEqual(expect.arrayContaining([3]));
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
      'A': {
        'B': 166538,
        'C': 505499
      },
      'B': {
        'A': 166538,
        'C': 350159
      },
      'C': {
        'A': 505499,
        'B': 350159
      }
    };
    const distances = generateDistances(nodes);
    expect(distances).toEqual(result);
  });
});