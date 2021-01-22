import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import useMap from '../hooks/useMap';
import { getCoords, getLatLngCenter } from '../helpers/mapHelpers';
import axios from 'axios';


export default function Map(props) {

  const googleURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  const tasks = props.data;

  const { createMarker, createPolyline } = useMap(tasks);

  const toronto = { lat: 43.653, lng: -79.383 };
  const center = tasks[0] ? getLatLngCenter(getCoords(tasks)) : toronto;
  // console.log(getCoords(tasks));

  const LineComponents = tasks.map(task => createPolyline(task));
  const MarkerComponents = tasks.map(task => createMarker(task));
  const MapComponent = withScriptjs(withGoogleMap(() => {
    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={center}
      >
        {MarkerComponents}
        {LineComponents}
      </GoogleMap>
    );
  }));
  // console.log(MapComponent);


  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=43.813,-79.495&destinations=43.732,-79.762&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

  axios.get(url)
    .then(res => console.log(res));

  return (
    <>
      <MapComponent
        googleMapURL={googleURL}
        loadingElement={<div style={{ height: '400px' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '400px' }} />}
      />
    </>
  );
}