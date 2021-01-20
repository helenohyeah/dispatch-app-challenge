import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import useMap from '../hooks/useMap';

export default function Map(props) {

  const tasks = props.data;
  const { createMarker } = useMap();

  const toronto = { lat: 43.653, lng: -79.383 };
  const googleURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`

  const MarkerComponents = tasks.map(task => createMarker(task));
  const MapComponent = withScriptjs(withGoogleMap(() => {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={toronto}
      >
        {MarkerComponents}
      </GoogleMap>
    );
  }));
  console.log(MapComponent);

  return (
    <>
      Map
      <MapComponent
        googleMapURL={googleURL}
        loadingElement={<div style={{ height: '400px' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '400px' }} />}
      />
    </>
  );
}