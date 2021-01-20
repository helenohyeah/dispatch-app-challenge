import { Loader } from '@googlemaps/js-api-loader';

export default function Map(props) {

  const tasks = props.data;
  const google = window.google;
  console.log('Map props:', props);

  // Google map loader settings
  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    version: 'weekly'
  });

  let map;
  const mapOptions = {
    center: { lat: 45.502, lng: -73.567 },
    zoom: 8
  };
  // const montreal = tasks[0];

  // Load map
  loader
    .load()
    .then(() => {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }).then(() => {
    // Create and set markers
    tasks.forEach(task => {
      const startPosition = { lat: task.startLat, lng: task.startLng };
      const startMarker = new google.maps.Marker({
        position: startPosition,
        title: `Task ${task.id} Start Position`,
      });
      startMarker.setMap(map);
      
      const endPosition = { lat: task.endLat, lng: task.endLng };
      const endMarker = new google.maps.Marker({
        position: endPosition,
        title: `Task ${task.id} end position`
      });
      endMarker.setMap(map);
    });
  })


  return (
    <div id='map' style={{ height: '400px', width: '600px' }}>
      {map}
    </div>
  );
}