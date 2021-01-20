import { getCoords } from '../mapHelpers';

// Mock data
const tasks = [
  {
    "id": 1,
    "startLat": 45.502,
    "startLng": -73.567,
    "endLat": 43.653,
    "endLng": -79.383,
    "freight": "Montreal->Toronto, Produce"
  },
  {
    "id": 2,
    "startLat": 45.422,
    "startLng": -75.697,
    "endLat": 43.653,
    "endLng": -79.383,
    "freight": "Ottawa->Toronto, Groceries"
  }
];

// Tests for get Coords
test('getCoords returns an array', () => {
  const result = getCoords(tasks);
  expect(Array.isArray(result)).toBe(true);
});
test('getCoords returns an array containing the correct coordinates and does not contain duplicates', () => {
  const result = getCoords(tasks);
  const actual = [
    [45.502, -73.567],
    [43.653, -79.383],
    [45.422, -75.697]
  ];
  expect(result).toEqual(actual);
});
test('getCoords returns undefined given no tasks', () => {
  const result = getCoords([]);
  expect(result).toBeNull();
});