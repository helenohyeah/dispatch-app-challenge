// DENYS: you can try and use hsl(), fix saturation and lightness, and just spit out a value for hue
const colors = [
  "FF0000", // red
  "008000", // green
  "0000FF", // blue
  "FF00FF", // magenta
  "FFFF00", // yellow
  "FFA500", // orange
  "FF1493", // pink
  "87CEFA", // light blue
  "8B0000", // dark red
  "800080", // purple
];

// Tracks color index and increment by 1 each time a color is assigned
let colorIndex = -1;

// Assign a color given task id number
function getColor() {
  if (colorIndex < colors.length) colorIndex++;
  if (colorIndex === colors.length) colorIndex = 0;
  return colors[colorIndex];
}

export { getColor };
