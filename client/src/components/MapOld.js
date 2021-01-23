import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from "react-google-maps";
import useMap from "../hooks/useMap";
import { getCoords, getLatLngCenter } from "../helpers/mapHelpers";
import { generateNodes, findShortestRoute } from '../helpers/routeHelpers';

// Map visual modes
const EMPTY = "EMPTY";
const LOADING = "LOADING";
const TASKS = "TASKS";
const ROUTE = "ROUTE";

export default function Map(props) {
  const googleURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  const tasks = props.data;

  const { createMarker, createPolyline } = useMap(tasks);

  const toronto = { lat: 43.653, lng: -79.383 };
  const center = tasks[0] ? getLatLngCenter(getCoords(tasks)) : toronto;
  // console.log(getCoords(tasks));

  const LineComponents = tasks.map((task) => createPolyline(task));
  const MarkerComponents = tasks.map((task) => createMarker(task));
  let startMarkers = [];
  let endMarkers = [];
  tasks.forEach(task => {
    startMarkers.push(createMarker(task.start, true));
    endMarkers.push(createMarker(task.end, false));
  });
  console.log(startMarkers)
  const MapComponent = withScriptjs(
    withGoogleMap(() => {
      return (
        <GoogleMap defaultZoom={7} defaultCenter={center}>
          {startMarkers}
          {endMarkers}
          {LineComponents}
        </GoogleMap>
      );
    })
  );
  // console.log(MapComponent);

  const nodes = generateNodes(tasks);
  const route = findShortestRoute(nodes);
  console.log('route', route);
  const routePath = route.map(node => node[Object.keys(node)[0]].coords);
  console.log('routePath:', routePath);
  const routeStartMarker = createMarker(routePath[0], true);
  const routeEndMarker = createMarker(routePath[routePath.length - 1], false);
  const RouteMap = withScriptjs(withGoogleMap(() => {
    return <GoogleMap defaultZoom={7} defaultCenter={toronto}>
      <Polyline path={routePath} />
      {routeStartMarker}
      {routeEndMarker}
    </GoogleMap>
  }));

  return (
    <>
      <MapComponent
        googleMapURL={googleURL}
        loadingElement={<div style={{ height: "400px" }} />}
        containerElement={<div style={{ height: "400px" }} />}
        mapElement={<div style={{ height: "400px" }} />}
      />
      {tasks.length > 0 && <RouteMap
        googleMapURL={googleURL}
        loadingElement={<div style={{ height: "400px" }} />}
        containerElement={<div style={{ height: "400px" }} />}
        mapElement={<div style={{ height: "400px" }} />}
      />}
    </>
  );
}
