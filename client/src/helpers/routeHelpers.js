import { getDistance } from 'geolib';

// Algorithim
// Begin with a hash map of nodes and distances
// Get all start nodes
// Run shortest path algorithm for all start nodes
  // For each start node
    // Current node = start node
    // Visit current node and update hash map of nodes
    // Find all possible nodes to visit and their distances from current node
    // While there are possible nodes to visit
      // Find the shortest distance node
      // Visit shortest distance node and update hash map of nodes
      // Current node = shortest distance node
      // Find all possible nodes to visit and their distances from current node until there are no more possible nodes to visit
    // Return shortest path
// Return shortest route = shortest shortest path

// Returns the node with the shortest distance value given start coordinates and a list of unvisited nodes
const findShortestDistanceNode = (start, nodes) => {
  let shortestDistanceNode;
  // Track distance from start
  let distance = 0;

  for (const node in nodes) {
    // Get distance of node from start
    const currentDistance = calcNodeDistance(start, nodes[node].coords);
    // If no shortest value or if node distance is less than current shortest
    if (!shortestDistanceNode || currentDistance < distance) {
      // Set shortest to currentNode
      shortestDistanceNode = node;
      // Set distance to currentDistance
      distance = currentDistance;
    }
  }
  // Return shortest distance node and distance from start
  return { shortestDistanceNode, distance };
};

// Returns a list of possible nodes to visit given a list of active tasks, and a hash map of nodes
const findNodesToVisit = (tasks, nodes) => {
  // Track list of possible nodes to visit
  const possibleNodes = {};

  // Loop through nodes
  for (const node in nodes) {
    const tasksToStart = nodes[node].tasksToStart;
    const tasksToEnd = nodes[node].tasksToEnd;

    // If node has incomplete tasksToStart
    if (tasksToStart.some(task => task.isComplete === false)) {
      // Add node to possible nodes
      possibleNodes[node] = nodes[node];
    }

    // If node's tasksToEnd contains any given tasks
    if (tasksToEnd.some(task => tasks.includes(task.id))) {
      // Add node to possible nodes
      possibleNodes[node] = nodes[node];
    }
  }
  
  // Return list of possible nodes to visit
  return possibleNodes;
};

// DENYS: do all your function docs like this:
/**
 * Returns a visited node and updated tasks given a node and a list of active tasks
 */ 
const visitNode = (node, tasks) => {
  // Track node
  let visitedNode = node;
  // Track active tasks
  let activeTasks = tasks;
  
  // If node is a start node
  if (visitedNode.tasksToStart.length > 0) {
    visitedNode.tasksToStart.forEach(task => {
      // If task is not complete
      if (!task.isComplete) {
        // Set task to complete
        task.isComplete = true;
        // Add task to activeTasks
        activeTasks.push(task.id);
      }
    });
  }
  
  // If node is an end node
  if (visitedNode.tasksToEnd.length > 0) {
    // Loop through tasksToEnd
    visitedNode.tasksToEnd.forEach(task => {
      // If task matches any activeTasks
      if (activeTasks.includes(task.id)) {
        // Set task to complete
        task.isComplete = true;
        // Remove task from activeTasks
        activeTasks = activeTasks.filter(taskId => taskId !== task.id);        
      }
    });
  }
  
  // Return node and active tasks
  return { visitedNode, activeTasks };
};

// Returns the path and total distance of the shortest path given a start node, a hash map of nodes, and a hash map of distances
const findShortestPath = (startNode, nodes) => {
  // Track distance from startNode
  let pathDistance = 0;
  // Track path from startNode and set it to startNode
  const path = [startNode];
  // Track tasks
  let tasks = [];

  // Set startNode to currentNode
  let currentNodeKey = Object.keys(startNode)[0];
  let currentNode = startNode[currentNodeKey];
  
  // Visit currentNode
  let { visitedNode, activeTasks } = visitNode(currentNode, tasks);
  // Update activeTasks
  tasks = activeTasks;
  // console.log(tasks);
  // Update nodes hash map with visited currentNode
  nodes[currentNodeKey] = visitedNode;
  // For the currentNode get a list of possible nodes to visit
  let possibleNodes = findNodesToVisit(tasks, nodes);
  
  // While there are nodes to visit
  while (Object.keys(possibleNodes).length > 0) {
    // findShortestDistanceNode given currentNode coords and nodes to visit
    let { shortestDistanceNode, distance } = findShortestDistanceNode(currentNode.coords, possibleNodes);
    // Update distance traveled and path
    pathDistance += distance;
    path.push({ [shortestDistanceNode]: nodes[shortestDistanceNode] });
    
    // Set shortestDistanceNode to currentNode
    currentNode = nodes[shortestDistanceNode];
    // Visit shortestDistanceNode (now currentNode)
    let { visitedNode, activeTasks } = visitNode(currentNode, tasks);
    // Update activeTasks
    tasks = activeTasks
    // Update nodes hash map with visited shortestDistanceNode (now currentNode)
    nodes[shortestDistanceNode] = visitedNode;
    // Get a new list of possible nodes to visit (loop ends if no possible nodes to visit)
    possibleNodes = findNodesToVisit(tasks, nodes);
  }

  // Return path and distance
  // console.log(path);
  return { path, pathDistance };
};

// Returns the path of the shortest route given a list of nodes
const findShortestRoute = (nodes) => {
  // Track shortest distance
  let distance = 0;
  // Track shortest route
  let shortest;
  if (Object.keys(nodes).length === 0) return shortest = [];

  // Get start nodes
  const startNodeKeys = Object.keys(nodes).filter(node => nodes[node].tasksToStart.length);
  
  // Loop through each startNode
  for (const startNode of startNodeKeys) {
    // Get the distance of the shortest path for that startNode
    const { path, pathDistance } = findShortestPath({ [startNode]: nodes[startNode] }, nodes);
    // If no shortest distance or if route distance is less than current shortest distance
    if (!shortest || distance < pathDistance) {
      // Set shortest distance and route to current distance and route
      shortest = path;
      distance = pathDistance;
    }
  }

  // Return shortest route
  return shortest;
};

// Returns the distance between two lat lng coordinates
const calcNodeDistance = (a, b) => {
  const start = { latitude: a.lat, longitude: a.lng };
  const end = { latitude: b.lat, longitude: b.lng };
  const accuracy = 1; // in meters

  return getDistance(start, end, accuracy);
};

// Return a hash map of nodes given a list of tasks
const generateNodes = (tasks) => {
  let nodes = {};
  if (tasks.length === 0) return nodes;

  tasks.forEach(task => {
    // Add taskToStart to node
    const startNodeName = `${task.start.lat},${task.start.lng}`;
    if (!nodes[startNodeName]) {
      // Create node
      nodes[startNodeName] = {
        coords: { lat: task.start.lat, lng: task.start.lng },
        tasksToStart: [{ id: task.id, isComplete: false}],
        tasksToEnd: []
      };
    } else {
      // Add to tasksToStart
      nodes[startNodeName].tasksToStart.push({ id: task.id, isComplete: false });
    }

    // Add taskToEnd to node
    const endNodeName = `${task.end.lat},${task.end.lng}`;
    if (!nodes[endNodeName]) {
      // Create node
      nodes[endNodeName] = {
        coords: { lat: task.end.lat, lng: task.end.lng },
        tasksToStart: [],
        tasksToEnd: [{ id: task.id, isComplete: false}]
      };
    } else {
      // Add to tasksToEnd
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