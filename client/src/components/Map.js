import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

export default function Map(props) {

  const toronto = { lat: 43.653, lng: -79.383 };
  const googleURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`

  const MapComponent = withScriptjs(withGoogleMap(() => {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={toronto}
      >
        <Marker
          position={toronto}
        />
      </GoogleMap>
    );
  }));
  console.log(MapComponent);

  return (
    <div style={{ height: '400px'}}>
      Map
      <MapComponent
        googleMapURL={googleURL}
        loadingElement={<div style={{ height: '400px' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '400px' }} />}
      />
    </div>
  );
}