import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

export default function View(props) {

  const MapComponent = withScriptjs(
    withGoogleMap(() => {
      return (
        <GoogleMap 
          defaultZoom={7} 
          defaultCenter={props.center} 
        >
          {props.markers}
          {props.polylines}
        </GoogleMap>
      );
    }));

  return (
    <MapComponent
      googleMapURL={props.url}
      loadingElement={<div style={{ height: "400px" }} />}
      containerElement={<div style={{ height: "400px" }} />}
      mapElement={<div style={{ height: "400px" }} />}
    />
  );
}