import View from "./View";
import useMap from "../../hooks/useMap";

// Map visual modes
const EMPTY = "EMPTY";
const LOADING = "LOADING";
const VIEW_TASK = "VIEW_TASK";
const VIEW_ROUTE = "VIEW_ROUTE";

export default function Map(props) {

  const { createTaskMap, createRouteMap } = useMap();
  
  const mode = props.mode;
  const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  const { taskMarkers, taskPolylines } = createTaskMap(props.data);
  const { routeMarkers, routePolylines } = createRouteMap(props.data);

  return (
    <>
      {mode === EMPTY && <p>No Map</p>}
      {mode === LOADING && <p>Loading Map...</p>}
      {mode === VIEW_TASK && (
        <View
          url={url}
          markers={taskMarkers}
          polylines={taskPolylines}
        />
      )}
      {mode === VIEW_ROUTE && (
        <View
          url={url}
          markers={routeMarkers}
          polylines={routePolylines}
        />
      )}
    </>
  );
}