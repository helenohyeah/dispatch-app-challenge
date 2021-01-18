import axios from 'axios';
import Map from './components/Map';

import './App.css';

function Form() {
  return (
    <>
      <h2>Create New Task</h2>
      <form>
        <label htmlFor="start-loc">Start Location:</label>
        <input type="text" name="start-loc"></input>
        <label htmlFor="end-loc">End Location:</label>
        <input type="text" name="end-loc"></input>
        <label htmlFor="freight">Freight Description:</label>
        <input type="text" name="freight"></input>
        <input type="submit" value="Create"></input>
      </form>
    </>
  );
}

function App() {

  // axios.defaults.baseURL = 'http://localhost:8080';
  // axios.get('/')
  //   .then(res => console.log('Response:', res))
  //   .catch(err => console.log('Error:', err));

  return (
    <>
      <h1>Hello Dispatcher</h1>
      <Form />
      <Map />
    </>
  );
}

export default App;
