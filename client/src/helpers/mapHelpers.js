import isEqual from "lodash.isequal";

/**
 * Returns center coordinates given a list of lat lng coordinates
 * Based on code from: https://stackoverflow.com/questions/6671183/calculate-the-center-point-of-multiple-latitude-longitude-coordinate-pairs
 */
const getLatLngCenter = (coords) => {
  const radToDeg = (rad) => (rad * 180) / Math.PI;
  const degToRad = (deg) => (deg * Math.PI) / 180;
  const latIndex = 0;
  const lngIndex = 1;

  // Convert each coord into 3D vector units
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;

  for (const coord of coords) {
    const lat = degToRad(coord[latIndex]);
    const lng = degToRad(coord[lngIndex]);
    // Sum each vector
    sumX += Math.cos(lat) * Math.cos(lng);
    sumY += Math.cos(lat) * Math.sin(lng);
    sumZ += Math.sin(lat);
  }

  // Normalise (average) resulting vector
  const avgX = sumX / coords.length;
  const avgY = sumY / coords.length;
  const avgZ = sumZ / coords.length;

  // Convert back to latitude longitude coordinates
  const hyp = Math.sqrt(avgX * avgX + avgY * avgY);
  const lat = Math.atan2(avgZ, hyp);
  const lng = Math.atan2(avgY, avgX);

  const centerLat = radToDeg(lat);
  const centerLng = radToDeg(lng);

  return { lat: centerLat, lng: centerLng };
};

/**
 * Returns a list of lat lng coordinates given a list of tasks
 */
const getCoords = (tasks) => {
  const coords = [];

  if (tasks.length === 0) return coords;

  tasks.forEach(task => {
    const startCoord = [task.start.lat, task.start.lng];
    const endCoord = [task.end.lat, task.end.lng];
    if (!coords.some(coord => isEqual(coord, startCoord))) {
      coords.push(startCoord);
    }
    if (!coords.some(coord => isEqual(coord, endCoord))) {
      coords.push(endCoord);
    }
  });

  return coords;
};

export { getLatLngCenter, getCoords };
