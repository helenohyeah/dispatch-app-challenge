import { Loader } from '@googlemaps/js-api-loader';

export default function Map() {

  let map;
  const mapOptions = {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  };

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    version: 'weekly'
  });
  loader.load().then(() => {
    map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    // console.log(map);
  }).catch(err => console.log(err));

  return (
    <div id='map' style={{ height: '400px', width: '600px' }}>
      {map}
    </div>
  );
}