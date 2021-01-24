import View from "./View";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import useMap from "../../hooks/useMap";

// Map modes
const TASKS = "TASKS";
const ROUTE = "ROUTE";

export default function Map(props) {
  
  const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  
  const { createTaskMap, createRouteMap } = useMap();
  const { taskMarkers, taskPolylines } = createTaskMap(props.data);
  const { routeMarkers, routePolylines } = createRouteMap(props.data);

  return (
    <Card>
      <Card.Header>
        <Nav fill variant="tabs" defaultActiveKey={TASKS} activeKey={props.mapMode}>
          <Nav.Item>
            <Nav.Link eventKey={TASKS} onSelect={(e) => props.setMapMode(e)}><h4>Tasks Map</h4></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={ROUTE} onSelect={(e) => props.setMapMode(e)} disabled={props.isRouteDisabled}><h4>Route Map</h4></Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        {props.mapMode === TASKS && (
          <View
            url={url}
            markers={taskMarkers}
            polylines={taskPolylines}
            />
        )}
        {props.mapMode === ROUTE && (
          <View
            url={url}
            markers={routeMarkers}
            polylines={routePolylines}
          />
        )}
      </Card.Body>
    </Card>
  );
}