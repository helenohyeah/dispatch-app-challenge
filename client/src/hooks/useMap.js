import { Marker } from 'react-google-maps';

export default function useMap() {

  function createMarker(task) {
    const start = { lat: task.startLat, lng: task.startLng };
    const end = { lat: task.endLat, lng: task.endLng };

    return(
      <>
        <Marker
          position={start}
        />
        <Marker
          position={end}
        />
      </>
    );
  }


  return {
    createMarker
  };
}