import axios from 'axios';

import './App.css';

function App() {

  axios.defaults.baseURL = 'http://localhost:8080';
  axios.get('/')
    .then(res => console.log('Response:', res))
    .catch(err => console.log('Error:', err));

  return (
    <>
      <h1>Hello Dispatcher</h1>
    </>
  );
}

export default App;
