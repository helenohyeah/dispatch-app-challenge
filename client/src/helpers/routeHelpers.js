// Algorithim
// Loop through each start node
// Keep track of total distance
// On each start node pick the closest next node from available nodes
  // Available nodes = all unvisited start nodes and end node of tasks 'assigned'
  // Set that start node to visited
  // Add distance to total distance
  // Repeat until all nodes are visited
// Pick the route with the shortest overall distance

// Return a list of start and end nodes given tasks
const generateNodes = (tasks) => {
  const nodes = { start: [], end: [] };

  const addNode = (coords, type, id) => {
    const foundIndex = nodes[type].findIndex(node => node.coords.lat === coords.lat && node.coords.lng === coords.lng);
    // If node exists, add task id to node
    if(foundIndex >= 0) {
      nodes[type][foundIndex].tasks.push(id);
    // Else add node to nodes list
    } else {
      const newNode = {
        tasks: [id],
        coords: coords,
        visited: false
      };
      nodes[type].push(newNode);
    }
  };

  tasks.forEach(task => {
    addNode(task.start, 'start', task.id);
    addNode(task.end, 'end', task.id);
  });

  return nodes;
}

// Return the distance between two nodes
// function calcNodeDistance(a, b) {

// }

// Returns the distance of a route given a start node and all nodes
// function calcRouteDistance() {

// }

export { generateNodes };