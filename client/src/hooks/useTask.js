import { useState } from 'react';

export default function useTask(initial) {

  const [task, setTask] = useState(initial);

  // Updates form for creating and editing a task
  const handleTaskChange = (e) => {
    // console.log(task, e.target)
    switch (e.target.name) {
      case 'start-lat':
        setTask(prev => {
          return { ...prev, startLat: Number(e.target.value) }  
        });
        break;
      case 'start-lng':
        setTask(prev => {
          return { ...prev, startLng: Number(e.target.value) }  
        });
        break;
      case 'end-lat':
        setTask(prev => {
          return { ...prev, endLat: Number(e.target.value) }  
        });
        break;
      case 'end-lng':
        setTask(prev => {
          return { ...prev, endLng: Number(e.target.value) }  
        });
        break;
      case 'freight':
        setTask(prev => {
          return { ...prev, freight: e.target.value }  
        });
        break;
    }
  }

  return {
    task,
    handleTaskChange
  };
}