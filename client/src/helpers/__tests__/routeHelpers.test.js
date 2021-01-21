import { generateNodes } from '../routeHelpers';

describe('generateNodes helper', () =>{
  it('should return a list of start and end nodes given list of unique locations', () => {
    const tasks = [
      {
        "id": 1,
        "color": "FF0000",
        "start": { lat: 45.502, lng: -73.567 },
        "end": { lat: 43.653, lng: -79.383 },
        "freight": "Montreal->Toronto, Produce"
      },
      {
        "id": 2,
        "color": "008000",
        "start": { lat: 45.422, lng: -75.697 },
        "end": { lat: 43.732, lng: -79.762 },
        "freight": "Ottawa->Brampton, Groceries"
      }
    ];
    const nodes = {
      start: [
        {
          tasks: [1],
          coords: { lat: 45.502, lng: -73.567 },
          visited: false
        },
        {
          tasks: [2],
          coords: { lat: 45.422, lng: -75.697 },
          visited: false
        }
      ],
      end: [
        {
          tasks: [1],
          coords: { lat: 43.653, lng: -79.383 },
          visited: false
        },
        {
          tasks: [2],
          coords: { lat: 43.732, lng: -79.762 },
          visited: false
        }
      ]
    };
    const result = generateNodes(tasks);
    expect(result).toEqual(nodes);
  });

  it('should return the correct list of start and end nodes given list with overlapping locations', () => {
    const tasks = [
      {
        "id": 1,
        "color": "FF0000",
        "start": { lat: 45.502, lng: -73.567 },
        "end": { lat: 43.653, lng: -79.383 },
        "freight": "Montreal->Toronto, Produce"
      },
      {
        "id": 2,
        "color": "008000",
        "start": { lat: 45.422, lng: -75.697 },
        "end": { lat: 43.653, lng: -79.383 },
        "freight": "Ottawa->Toronto, Groceries"
      }
    ];
    const nodes = {
      start: [
        {
          tasks: [1],
          coords: { lat: 45.502, lng: -73.567 },
          visited: false
        },
        {
          tasks: [2],
          coords: { lat: 45.422, lng: -75.697 },
          visited: false
        }
      ],
      end: [
        {
          tasks: [1, 2],
          coords: { lat: 43.653, lng: -79.383 },
          visited: false
        }
      ]
    };
    const result = generateNodes(tasks);
    expect(result.end[0].tasks.length).toEqual(2);
    expect(result).toEqual(nodes);
  })
});