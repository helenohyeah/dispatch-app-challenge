import { Marker, Polyline } from "react-google-maps";
import { generateNodes, findShortestRoute } from '../helpers/routeHelpers';

export default function useMap() {

  /**
   * Returns a map marker given a position and isStart
   */
  const createMarker = (position, isStart) => {
    const icon = isStart ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    return <Marker position={position} icon={icon} />;
  };

  /**
   * Returns a map polyline given a lat lng coordinate and options
   */
  const createPolyline = (coords, options) => {
    return <Polyline path={coords} options={options} />
  };

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
        { strokeColor: `#${task.color}` }
      ));
    });

    return { taskMarkers, taskPolylines };
  };

  /**
   * Returns route markers and polylines given a list of tasks
   */
  const createRouteMap = (tasks) => {
    if (tasks.length === 0) return { routeMarkers: [], routePolylines: []}; // Note: Shouldn't ever happen in production

    const routeMarkers = [];

    const nodes = generateNodes(tasks);
    const route = findShortestRoute(nodes);
    const routePath = route.map(node => node[Object.keys(node)[0]].coords);
    
    // Create markers at start and end of route
    routeMarkers.push(createMarker(routePath[0].coords, true));
    routeMarkers.push(createMarker(routePath[routePath.length - 1].coords, false));

    // Create polylines
    const routePolylines = createPolyline(routePath);
    
    return { routeMarkers, routePolylines };
  }

  return {
    createTaskMap,
    createRouteMap
  };
}
