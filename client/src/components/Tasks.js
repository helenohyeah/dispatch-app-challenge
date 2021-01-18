import { useEffect } from 'react';
import axios from 'axios';

export default function Tasks() {
  axios.defaults.baseURL = 'http://localhost:8080';
  useEffect(() => {
    axios.get('/api/tasks')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h2>Tasks</h2>
    </>
  )
}