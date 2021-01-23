import View from "./View";
import Button from "../Button";
import useMap from "../../hooks/useMap";
import { useState } from "react";

// Map modes
const VIEW_TASK = "VIEW_TASK";
const VIEW_ROUTE = "VIEW_ROUTE";

export default function Map(props) {

  // const [ mapMode, setMapMode ] = useState("VIEW_TASK");

  // if (props.showRoute) setMapMode("VIEW_ROUTE");
  
  const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  
  const { createTaskMap, createRouteMap } = useMap();
  const { taskMarkers, taskPolylines } = createTaskMap(props.data);
  const { routeMarkers, routePolylines } = createRouteMap(props.data);

  return (
    <>
      {props.showRoute && (
        <>
          <Button onClick={() => props.setMapMode(VIEW_TASK)}>View Tasks</Button>
          <Button onClick={() => props.setMapMode(VIEW_ROUTE)}>View Route</Button>
        </>
      )}
      {props.mapMode === VIEW_TASK && (
        <View
          url={url}
          markers={taskMarkers}
          polylines={taskPolylines}
        />
      )}
      {(props.showRoute && props.mapMode === VIEW_ROUTE) && (
        <View
          url={url}
          markers={routeMarkers}
          polylines={routePolylines}
        />
      )}
    </>
  );
}