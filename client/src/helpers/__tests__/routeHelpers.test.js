import { generateNodes } from '../routeHelpers';

// Mock data
const tasks = [
  {
    "id": 1,
    "color": "FF0000",
    "startLat": 45.502,
    "startLng": -73.567,
    "endLat": 43.653,
    "endLng": -79.383,
    "freight": "Montreal->Toronto, Produce"
  },
  {
    "id": 2,
    "color": "008000",
    "startLat": 45.422,
    "startLng": -75.697,
    "endLat": 43.653,
    "endLng": -79.383,
    "freight": "Ottawa->Toronto, Groceries"
  },
  {
    "id": 3,
    "color": "0000FF",
    "startLat": 43.813,
    "startLng": -79.495,
    "endLat": 45.502,
    "endLng": -73.567,
    "freight": "Concord->Montreal, Produce"
  }
]

const nodes = {
  start: [
    {
      tasks: [1],
      location: { lat: 45.502, lng: -73.567 },
      visited: false
    },
    {
      tasks: [2],
      location: { lat: 45.422, lng: -75.697 },
      visited: false
    },
    {
      tasks: [3],
      location: { lat: 43.813, lng: -79.495 },
      visited: false
    },
  ],
  end: [
    {
      tasks: [1],
      location: { lat: 43.653, lng: -79.383 },
      visited: false
    },
    {
      tasks: [2],
      location: { lat: 43.653, lng: -79.383 },
      visited: false
    },
    {
      tasks: [1],
      location: { lat: 45.502, lng: -73.567 },
      visited: false
    }
  ]
};

describe('generateNodes helper', () =>{
  it('should return a list of start and end nodes given list of unique locations', () => {
    const tasks = [
      {
        "id": 1,
        "color": "FF0000",
        "startLat": 45.502,
        "startLng": -73.567,
        "endLat": 43.653,
        "endLng": -79.383,
        "freight": "Montreal->Toronto, Produce"
      },
      {
        "id": 2,
        "color": "008000",
        "startLat": 45.422,
        "startLng": -75.697,
        "endLat": 43.732,
        "endLng": -79.762,
        "freight": "Ottawa->Brampton, Groceries"
      }
    ];
    const nodes = {
      start: [
        {
          tasks: [1],
          location: { lat: 45.502, lng: -73.567 },
          visited: false
        },
        {
          tasks: [2],
          location: { lat: 45.422, lng: -75.697 },
          visited: false
        }
      ],
      end: [
        {
          tasks: [1],
          location: { lat: 43.653, lng: -79.383 },
          visited: false
        },
        {
          tasks: [2],
          location: { lat: 43.732, lng: -79.762 },
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
        "startLat": 45.502,
        "startLng": -73.567,
        "endLat": 43.653,
        "endLng": -79.383,
        "freight": "Montreal->Toronto, Produce"
      },
      {
        "id": 2,
        "color": "008000",
        "startLat": 45.422,
        "startLng": -75.697,
        "endLat": 43.653,
        "endLng": -79.383,
        "freight": "Ottawa->Toronto, Groceries"
      }
    ];
    const nodes = {
      start: [
        {
          tasks: [1],
          location: { lat: 45.502, lng: -73.567 },
          visited: false
        },
        {
          tasks: [2],
          location: { lat: 45.422, lng: -75.697 },
          visited: false
        }
      ],
      end: [
        {
          tasks: [1, 2],
          location: { lat: 43.653, lng: -79.383 },
          visited: false
        }
      ]
    };
    const result = generateNodes(tasks);
    expect(result).toEqual(nodes);
  })
});