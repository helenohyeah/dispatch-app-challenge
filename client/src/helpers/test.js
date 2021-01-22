import axios from 'axios';

const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=43.813,-79.495&destinations=43.732,-79.762&key=${process.end.REACT_APP_GOOGLE_API_KEY}`;

axios.get('/')
  .then(res => console.log(res));