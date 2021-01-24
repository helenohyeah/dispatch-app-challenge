import { getDistance } from 'geolib';

/* 
Algorithim notes (based on Dijkstra's algorithm)

Begin with a hash map of locations (nodes map)
Run shortest path algorithm each all start nodes
  For each start node
    Track shortest path
    Set current node = start node and update path
    Visit current node and update nodes map
    Using updated nodes map, find possible nodes to visit
    While there are possible nodes to visit
      Find the shortest distance node
      Set current node = shortest distance node and update path
      Visit current and update nodes map
      Using updated nodes map, find possible nodes to visit
    Return shortest path
Return shortest route = shortest shortest path
*/

/**
 * Returns the shortest distance node from start node given a start node and a hash map of nodes
 */
const findShortestDistanceNode = (start, nodes) => {
  let shortestDistanceNode;
  let distance = 0;

  for (const node in nodes) {
    const currentDistance = calcNodeDistance(start, nodes[node].coords);
    // If no shortest node or shortest distance is less than current distance
    if (!shortestDistanceNode || currentDistance < distance) {
      // Set shortest to currentNode
      shortestDistanceNode = node;
      // Set distance to currentDistance
      distance = currentDistance;
    }
  }
  // Return shortest distance node and distance
  return { shortestDistanceNode, distance };
};

/**
 * Returns a list of possible nodes to visit given a list of active tasks, and a hash map of nodes
 */
const findNodesToVisit = (tasks, nodes) => {
  const possibleNodes = {};

  for (const node in nodes) {
    const tasksToStart = nodes[node].tasksToStart;
    const tasksToEnd = nodes[node].tasksToEnd;

    // Node can be visisted if it has incomplete tasksToStart
    if (tasksToStart.some(task => task.isComplete === false)) possibleNodes[node] = nodes[node];

    // Node can be visisted if node its tasksToEnd contains any active tasks
    if (tasksToEnd.some(task => tasks.includes(task.id))) possibleNodes[node] = nodes[node];
  }
  
  return possibleNodes;
};

/**
 * Returns a visited node and updated tasks list given the node and a list of tasks
 */ 
const visitNode = (node, tasks) => {
  let visitedNode = node;
  let activeTasks = tasks;
  
  // Update start tasks on start node
  if (visitedNode.tasksToStart.length > 0) {
    visitedNode.tasksToStart.forEach(task => {
      if (!task.isComplete) {
        task.isComplete = true;
        activeTasks.push(task.id);
      }
    });
  }
  
  // Update end tasks on end node
  if (visitedNode.tasksToEnd.length > 0) {
    visitedNode.tasksToEnd.forEach(task => {
      if (activeTasks.includes(task.id)) {
        task.isComplete = true;
        activeTasks = activeTasks.filter(taskId => taskId !== task.id);        
      }
    });
  }
  
  return { visitedNode, activeTasks };
};

/**
 * Returns shortest path and distance given a start node and a nodes map
 */
const findShortestPath = (startNode, nodes) => {
  let pathDistance = 0;
  const path = [startNode];
  let tasks = [];

  // Set startNode to currentNode
  let currentNodeKey = Object.keys(startNode)[0];
  let currentNode = startNode[currentNodeKey];
  
  // Visit currentNode and update tasks and nodes map
  let { visitedNode, activeTasks } = visitNode(currentNode, tasks);
  tasks = activeTasks;
  nodes[currentNodeKey] = visitedNode;

  // Get a list of possible nodes to visit
  let possibleNodes = findNodesToVisit(tasks, nodes);
  
  while (Object.keys(possibleNodes).length > 0) {
    let { shortestDistanceNode, distance } = findShortestDistanceNode(currentNode.coords, possibleNodes);

    // Update distance traveled and path
    pathDistance += distance;
    path.push({ [shortestDistanceNode]: nodes[shortestDistanceNode] });
    
    // Set shortestDistanceNode to currentNode
    currentNode = nodes[shortestDistanceNode];

    // Visit currentNode and update tasks and nodes map
    let { visitedNode, activeTasks } = visitNode(currentNode, tasks);
    tasks = activeTasks
    nodes[shortestDistanceNode] = visitedNode;

    // Get a new list of possible nodes to visit (loop ends if no possible nodes to visit)
    possibleNodes = findNodesToVisit(tasks, nodes);
  }

  return { path, pathDistance };
};

/**
 * Returns the path of the shortest route given a hash map of nodes
 */
const findShortestRoute = (nodes) => {
  let distance = 0;
  let shortest;
  if (Object.keys(nodes).length === 0) return shortest = [];

  const startNodeKeys = Object.keys(nodes).filter(node => nodes[node].tasksToStart.length);
  
  for (const startNode of startNodeKeys) {
    const { path, pathDistance } = findShortestPath({ [startNode]: nodes[startNode] }, nodes);
    
    // If no shortest distance or if route distance is less than current shortest distance
    if (!shortest || distance < pathDistance) {
      // Set shortest distance and route to current distance and route
      shortest = path;
      distance = pathDistance;
    }
  }

  return shortest;
};

/**
 * Returns the distance between two lat lng coordinates
 */
const calcNodeDistance = (a, b) => {
  const start = { latitude: a.lat, longitude: a.lng };
  const end = { latitude: b.lat, longitude: b.lng };
  const accuracy = 1; // in meters

  return getDistance(start, end, accuracy);
};

/**
 * Returns a hash map of nodes given a list of tasks
 */
const generateNodes = (tasks) => {
  let nodes = {};
  if (tasks.length === 0) return nodes;

  tasks.forEach(task => {
    // Add start tasks
    const startNodeName = `${task.start.lat},${task.start.lng}`;
    if (!nodes[startNodeName]) {
      // Create node and add tasks
      nodes[startNodeName] = {
        coords: { lat: task.start.lat, lng: task.start.lng },
        tasksToStart: [{ id: task.id, isComplete: false}],
        tasksToEnd: []
      };
    } else {
      // Add tasks
      nodes[startNodeName].tasksToStart.push({ id: task.id, isComplete: false });
    }

    // Add end tasks
    const endNodeName = `${task.end.lat},${task.end.lng}`;
    if (!nodes[endNodeName]) {
      // Create node and add tasks
      nodes[endNodeName] = {
        coords: { lat: task.end.lat, lng: task.end.lng },
        tasksToStart: [],
        tasksToEnd: [{ id: task.id, isComplete: false}]
      };
    } else {
      // Add tasks
      nodes[endNodeName].tasksToEnd.push({ id: task.id, isComplete: false });
    }
  });

  return nodes;
};

export {
  findShortestDistanceNode,
  findNodesToVisit,
  visitNode,
  findShortestPath,
  findShortestRoute,
  calcNodeDistance,
  generateNodes
};