import { Marker, Polyline } from "react-google-maps";
import { generateNodes, findShortestRoute } from "../helpers/routeHelpers";
import { getCoords, getLatLngCenter } from "../helpers/mapHelpers";

export default function useMap() {

  // Map Marker icons
  // Taken from https://sites.google.com/site/gmapsdevelopment/
  const startIcon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
  const endIcon = "http://maps.google.com/mapfiles/kml/paddle/red-blank.png";

  /**
   * Returns a map marker given a coordinate and marker icon url (default: yellow)
   */
  const createMarker = (coord, iconUrl) => {
    return <Marker key={`${coord.lat},${coord.lng}`} position={coord} icon={iconUrl} />;
  };

  /**
   * Returns a map polyline given lat lng coordinates
   */
  const createPolyline = (coords, options) => <Polyline key={`${coords[0].lat},${coords[0].lng}`} path={coords} options={options} />;

  /**
   * Returns task markers and polylines given a list of tasks
   */
  const createTaskMap = (tasks) => {
    const taskMarkers = [];
    const taskPolylines = [];

    // Create markers and polyline for each task
    tasks.forEach(task => {
      taskMarkers.push(createMarker(task.start, startIcon));
      taskMarkers.push(createMarker(task.end,endIcon));
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

    // Create numbered markers at each stop
    routePath.forEach((node, i) => {
      const markerIcon = `http://maps.google.com/mapfiles/kml/paddle/${i + 1}.png`;
      routeMarkers.push(createMarker(node, markerIcon));
    });

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
