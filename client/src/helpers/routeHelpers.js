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
  // Track shortest distance node
  let shortest = null;
  // Track distance from start
  let distance = 0;

  // Loop through each node in unvisited nodes
  for (const node in nodes) {
    // Get distance of node from start
    const currentDistance = calcNodeDistance(start, nodes[node].coords);
    // If no shortest value or if node distance is less than current shortest
    if (!shortest || currentDistance < distance) {
      // Set shortest to currentNode
      shortest = node;
      // Set distance to currentDistance
      distance = currentDistance;
    }
  }
  // Return shortest distance node and distance from start
  return { shortest, distance };
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

// Returns a visited node and updated tasks given a node and a list of active tasks
const visitNode = (node, tasks) => {
  // Track node
  let visitedNode = node;
  // Track active tasks
  let activeTasks = tasks;
  
  // If node is a start node
  if(visitedNode.tasksToStart.length) {
    // Set all tasksToStart to complete
    // Add tasks to activeTasks
    visitedNode.tasksToStart.forEach(task => {
      task.isComplete = true;
      activeTasks.push(task.id);
    });
  }
  
  // If node is an end node
  if(visitedNode.tasksToEnd.length) {
    // Loop through tasksToEnd
    visitedNode.tasksToEnd.forEach(task => {
      // If task matches any activeTasks
      if(activeTasks.includes(task.id)) {
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
  // Track path from startNode
  // Track currentNode
  // Track activeTasks
  
  // Set startNode to currentNode
  // Visit currentNode
    // Update currentNode and activeTasks
    // Update nodes hash map with visited currentNode
  // For the currentNode get a list of possible nodes to visit
  // While there are nodes to visit
    // findShortestDistanceNode given currentNode coords and nodes to visit
    // Set shortestDistanceNode to currentNode
    // Visit shortestDistanceNode (now currentNode)
      // Update distance traveled and path
      // Update shortestDistanceNode (now currentNode) and activeTasks
      // Update nodes hash map with visited shortestDistanceNode (now currentNode)
      // Get a new list of possible nodes to visit (loop ends if no possible nodes to visit)

  // Return path and distance
};

// Returns the path of the shortest route given a list of nodes
const findShortestRoute = (nodes) => {
  // Track shortest distance
  // Track shortest route

  // Generate a distances hash map of each node and it's distance to all other nodes

  // Loop through each startNode
  // Get the distance of the shortest path for that startNode
  // If no shortest distance or if route distance is less than current shortest distance
    // Set shortest distance and route to current distance and route
  
  // Return shortest route
};

// Returns the distance between two lat lng coordinates
const calcNodeDistance = (a, b) => {
  const start = { latitude: a.lat, longitude: a.lng };
  const end = { latitude: b.lat, longitude: b.lng };
  const accuracy = 1; // in meters

  return getDistance(start, end, accuracy);
};


// Returns a hash map of each node and it's distance to all other nodes given a hash map of nodes
const generateDistances = (nodes) => {
  // Track distances
  const distances = {};

  const nodeKeys = Object.keys(nodes);
  
  for (let i = 0; i < nodeKeys.length - 1; i++) {
    const firstNode = nodes[nodeKeys[i]];
    if(!distances[nodeKeys[i]]) distances[nodeKeys[i]] = {};

    for (let j = 1; j < nodeKeys.length; j++) {
      if (i === j) continue;
      if (!distances[nodeKeys[j]]) distances[nodeKeys[j]] = {};

      const secondNode = nodes[nodeKeys[j]];
      const distance = calcNodeDistance(firstNode.coords, secondNode.coords);
      
      distances[nodeKeys[i]][nodeKeys[j]] = distance;
      distances[nodeKeys[j]][nodeKeys[i]] = distance;
    }
  }
  // Return distances
  return distances;
};

// Return a hash map of nodes given a list of tasks
const generateNodes = (tasks) => {

};

export {
  findShortestDistanceNode,
  findNodesToVisit,
  visitNode,
  findShortestPath,
  findShortestRoute,
  calcNodeDistance,
  generateDistances,
  generateNodes
};