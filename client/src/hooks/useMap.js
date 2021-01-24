import { Marker, Polyline } from "react-google-maps";
import { generateNodes, findShortestRoute } from "../helpers/routeHelpers";
import { getCoords, getLatLngCenter } from "../helpers/mapHelpers";

export default function useMap() {

  /**
   * Returns a map marker given a position and if marker is a start maker
   */
  const createMarker = (position, isStart) => {
    const icon = isStart ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    return <Marker position={position} icon={icon} />;
  };

  /**
   * Returns a map polyline given lat lng coordinates
   */
  const createPolyline = (coords, options) => <Polyline path={coords} options={options} />;

  /**
   * Returns task markers and polylines given a list of tasks
   */
  const createTaskMap = (tasks) => {
    const taskMarkers = [];
    const taskPolylines = [];

    // Create markers and polyline for each task
    tasks.forEach(task => {
      taskMarkers.push(createMarker(task.start, true));
      taskMarkers.push(createMarker(task.end,false));
      taskPolylines.push(createPolyline(
        [task.start, task.end],
        { strokeColor: task.color }
      ));
    });

    return { taskMarkers, taskPolylines };
  };

  /**
   * Returns route markers and polylines given a list of tasks
   */
  const createRouteMap = (tasks) => {
    // Handle renders when no tasks are provided
    if (tasks.length === 0) return { routeMarkers: [], routePolylines: []};

    const routeMarkers = [];

    const nodes = generateNodes(tasks);
    const route = findShortestRoute(nodes);
    const routePath = route.map(node => node[Object.keys(node)[0]].coords);
    
    // Create markers at start and end of route
    routeMarkers.push(createMarker(routePath[0], true));
    routeMarkers.push(createMarker(routePath[routePath.length - 1], false));

    // Create polylines
    const routePolylines = createPolyline(routePath);
    
    return { routeMarkers, routePolylines };
  };

  /**
   * Returns center coordinate given a list of tasks
   */
  const getCenterCoords = (tasks) => {
    const coords = getCoords(tasks);
    const center = getLatLngCenter(coords);
    return center;
  };

  return {
    createTaskMap,
    createRouteMap,
    getCenterCoords,
  };
}
