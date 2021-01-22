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

// Returns the node with the shortest distance value given a hash map of distances and a list of unvisited nodes
const findShortestDistanceNode = (distances, nodes) => {
  // Track shortest distance node
  let shortest = null;

  // Loop through each node in unvisited nodes
  for (const node in nodes) {
    // If no shortest value or if node distance is less than current shortest
      // Set shortest to currentNode
  }
  return shortest;
};

// Returns a list of possible nodes to visit given a node, a list of active tasks, and a hash map of nodes
const findNodesToVisit = (node, tasks, nodes) => {
  // Track list of possible nodes to visit

  // Loop through nodes
  // If node isStart AND tasksToStart is not empty
    // Add node to possible nodes
  // If tasksToEnd contains any active task
    // Add node to possible nodes
  
  // Return list of possible nodes to visit
};

// Returns a visited node and updated tasks given a node and a list of active tasks
const visitNode = (node, tasks) => {
  // Track node
  const visitedNode = node;
  // Track active tasks
  const activeTasks = tasks;

  // If node is a startNode
    // Set all tasksToStart to complete
    // Add tasks to activeTasks
  // If node is an endNode
    // Loop through tasksToEnd
      // If task matches any activeTasks
        // Set task to complete
        // Remove task from activeTasks
  
  // Return node and active tasks
  return { visitedNode, activeTasks };
};

// Returns the path and total distance of the shortest path given a start node, a hash map of nodes, and a hash map of distances
const findShortestPath = (startNode, nodes, distances) => {
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
    // findShortestDistanceNode given distances and nodes to visit
    // Set shortestDistanceNode to currentNode
    // Visit shortestDistanceNode (now currentNode)
      // Update distance and path
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

// Returns the distance between two nodes
const calcNodeDistance = (a, b) => {

};

// Returns a hash map of each node and it's distance to all other nodes given a hash map of nodes
const generateDistances = (nodes) => {
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