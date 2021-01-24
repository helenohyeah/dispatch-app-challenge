import { useState } from "react";

export default function useTaskForm(initial) {

  const [ task, setTask ] = useState(initial);

  /**
   * Handle task form changes
   */
  const handleChange = (e) => {
    switch (e.target.id) {
      case "startCity":
        setTask(prev => {
          const start = { ...prev["start"], city: e.target.value }
          return { ...prev, start };
        });
        break;
      case "startLat":
        setTask((prev) => {
          const start = { ...prev["start"], lat: Number(e.target.value) };
          return { ...prev, start };
        });
        break;
      case "startLng":
        setTask((prev) => {
          const start = { ...prev["start"], lng: Number(e.target.value) };
          return { ...prev, start };
        });
        break;
      case "endCity":
        setTask(prev => {
          const end = { ...prev["end"], city: e.target.value }
          return { ...prev, end };
        });
        break;
      case "endLat":
        setTask((prev) => {
          const end = { ...prev["end"], lat: Number(e.target.value) };
          return { ...prev, end };
        });
        break;
      case "endLng":
        setTask((prev) => {
          const end = { ...prev["end"], lng: Number(e.target.value) };
          return { ...prev, end };
        });
        break;
      case "freight":
        setTask((prev) => {
          return { ...prev, freight: e.target.value };
        });
        break;
    }
  };

  return {
    task,
    handleChange,
  };
}
