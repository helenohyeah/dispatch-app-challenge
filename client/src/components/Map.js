import { Loader } from '@googlemaps/js-api-loader';

export default function Map() {

  let map;
  const mapOptions = {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  };

  const loader = new Loader({
    apiKey: 'AIzaSyBb5ldEkUK3bN4siztJ2DvWX_Fi6uu9aeA',
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