import { useState } from 'react';

export default function useTask(initial) {

  const [task, setTask] = useState(initial);

  // Updates form for creating and editing a task
  const handleTaskChange = (e) => {
    // console.log(task, e.target)
    switch (e.target.name) {
      case 'start-lat':
        setTask(prev => {
          const start = { ...prev['start'], lat: Number(e.target.value)};
          return { ...prev, start };
        });
        break;
      case 'start-lng':
        setTask(prev => {
          const start = { ...prev['start'], lng: Number(e.target.value)};
          return { ...prev, start };
        });
        break;
      case 'end-lat':
        setTask(prev => {
          const end = { ...prev['end'], lat: Number(e.target.value)};
          return { ...prev, end };
        });
        break;
      case 'end-lng':
        setTask(prev => {
          const end = { ...prev['end'], lng: Number(e.target.value)};
          return { ...prev, end };
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