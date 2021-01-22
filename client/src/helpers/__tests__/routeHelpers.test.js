import {
  findShortestDistanceNode,
  findNodesToVisit,
  visitNode,
  findShortestPath,
  findShortestRoute,
  calcNodeDistance,
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
    
    test('it should not remove tasks that aren\'t in tasksToEnd from active tasks', () => {
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

    test('it should not remove tasks that aren\'t in tasksToEnd from active tasks', () => {
      const tasks = [1, 4];
      const { activeTasks } = visitNode(node,tasks);
      expect(activeTasks).toEqual(expect.arrayContaining([4]));
    });
  });
});
