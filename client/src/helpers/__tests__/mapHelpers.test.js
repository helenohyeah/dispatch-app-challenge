import { getCoords } from "../mapHelpers";

describe("getCoords", () => {
  const tasks = [
    {
      id: 1,
      start: { city: "Montreal", lat: 45.502, lng: -73.567 },
      end: { city: "Toronto", lat: 43.653, lng: -79.383 },
      freight: " Produce"
    },
    {
      id: 2,
      start: { city: "Ottawa", lat: 45.422, lng: -75.697 },
      end: { city: "Toronto", lat: 43.653, lng: -79.383 },
      freight: "Groceries"
    },
  ];

  test("it should return an array", () => {
    const result = getCoords(tasks);
    expect(Array.isArray(result)).toBe(true);
  });

  test("it should return an array containing the correct coordinates and does not contain duplicates", () => {
    const result = getCoords(tasks);
    const actual = [
      [45.502, -73.567],
      [43.653, -79.383],
      [45.422, -75.697],
    ];
    expect(result).toEqual(actual);
  });

  test("getCoords returns a empty array given no tasks", () => {
    const result = getCoords([]);
    expect(result).toEqual([]);
  });
});


