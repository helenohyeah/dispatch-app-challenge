import Form from './components/Form';
import Map from './components/Map';
import Tasks from './components/Tasks';

import './App.css';

function App() {

  // axios.defaults.baseURL = 'http://localhost:8080';
  // axios.get('/')
  //   .then(res => console.log('Response:', res))
  //   .catch(err => console.log('Error:', err));

  return (
    <>
      <h1>Hello Dispatcher</h1>
      <Form />
      {/* <Map /> */}
      <Tasks />
    </>
  );
}

export default App;
