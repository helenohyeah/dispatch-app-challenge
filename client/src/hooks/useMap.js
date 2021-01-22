import { Marker, Polyline } from "react-google-maps";

export default function useMap() {
  // Returns a map marker component given a task
  // function createMarker(task) {
  //   const { start, end } = task;

  //   return (
  //     <>
  //       <Marker
  //         key={`${task.id}-start`}
  //         position={start}
  //         icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
  //       />
  //       <Marker
  //         key={`${task.id}-end`}
  //         position={end}
  //         icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
  //       />
  //     </>
  //   );
  // }
  const createMarker = (position, isStart) => {
    const icon = isStart ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    return <Marker position={position} icon={icon} />;
  }

  // Returns a polyline connecting start and end location given a task
  // DENYS: use arrow functions when possible
  function createPolyline(task) {
    const pathCoords = [task.start, task.end];
    const lineOptions = {
      strokeColor: `#${task.color}`,
    };

    return <Polyline key={task.id} path={pathCoords} options={lineOptions} />;
  }

  // const createRoute = (route) => {
  //   // Create markers (node)
  //   // Create polyline (start, finish)
  // }

  return {
    createMarker,
    createPolyline,
  };
}
