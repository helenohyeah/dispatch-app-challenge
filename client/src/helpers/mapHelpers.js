// Returns center coordinates given an array of latitude and longitude coordinates in degrees
// e.g. [[latitude, longitude], [latitude, longitude]]
// DENYS:  loosely based on code from: https://<some link here>
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

// Returns an array of coordinates given tasks
const getCoords = (tasks) => {
  if (!tasks[0]) return null;

  const isSameCoord = (a, b) => a[0] === b[0] && a[1] === b[1];

  const coords = [];
  tasks.forEach((task) => {
    const startCoord = [task.start.lat, task.start.lng];
    const endCoord = [task.end.lat, task.end.lng];
    if (!coords.some((coord) => isSameCoord(coord, startCoord)))
      coords.push(startCoord);
    if (!coords.some((coord) => isSameCoord(coord, endCoord)))
      coords.push(endCoord);
  });

  return coords;
};

export { getLatLngCenter, getCoords };
