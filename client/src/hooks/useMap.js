import { Marker, Polyline } from 'react-google-maps';

export default function useMap() {

  // Returns a map marker component given a task
  function createMarker(task) {
    const start = { lat: task.startLat, lng: task.startLng };
    const end = { lat: task.endLat, lng: task.endLng };

    return (
      <>
        <Marker
          key={`${task.id}-start`}
          position={start}
          icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
        />
        <Marker
          key={`${task.id}-end`}
          position={end}
          icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
        />
      </>
    );
  }

  // Returns a polyline connecting start and end location given a task
  function createPolyline(task) {
    const pathCoords = [
      { lat: task.startLat, lng: task.startLng },
      { lat: task.endLat, lng: task.endLng }
    ];
    const lineOptions = {
      strokeColor: `#${task.color}`
    };

    return (
      <Polyline
        key={task.id}
        path={pathCoords}
        options={lineOptions}
      />
    );
  }


  return {
    createMarker,
    createPolyline
  };
}