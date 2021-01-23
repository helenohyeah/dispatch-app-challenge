import TaskMap from "./TaskMap";
import RouteMap from "./RouteMap";
import useMap from "../../hooks/useMap";

// Map visual modes
const EMPTY = "EMPTY";
const LOADING = "LOADING";
const TASKS = "TASKS";
const ROUTE = "ROUTE";

export default function Map(props) {

  const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  const mode = props.mode;

  return (
    <>
      {mode === EMPTY && <p>No Map</p>}
      {mode === LOADING && <p>Loading Map...</p>}
      {mode === TASKS && (
        <TaskMap
          url={url}
          tasks={props.data}
        />
      )}
      {mode === ROUTE && (
        <RouteMap />
      )}
    </>
  );
}