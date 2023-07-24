import { Action, Display, State } from ".";

export type Game = {
  display: Display;
  requestedActions: Action[];
  gameState: State;
}

export const gameExample: Game = {
  "gameState": {
    "scores": [
      0,
      0
    ],
    "game_over": false
  },
  "display": {
    "player": 1,
    "width": 300,
    "height": 300,
    "content": [
      {
        "tag": "style",
        "content": "line{stroke:black;stroke-width:4;}"
      },
      {
        "tag": "line",
        "x1": "0",
        "y1": "100",
        "x2": "300",
        "y2": "100"
      },
      {
        "tag": "line",
        "x1": "100",
        "y1": "0",
        "x2": "100",
        "y2": "300"
      },
      {
        "tag": "line",
        "x1": "0",
        "y1": "200",
        "x2": "300",
        "y2": "200"
      },
      {
        "tag": "line",
        "x1": "200",
        "y1": "0",
        "x2": "200",
        "y2": "300"
      }
    ]
  },
  "requestedActions": [
    {
      "type": "CLICK",
      "player": 1,
      "zones": [
        {
          "x": 0,
          "y": 100,
          "width": 100,
          "height": 100
        },
        {
          "x": 0,
          "y": 200,
          "width": 100,
          "height": 100
        },
        {
          "x": 100,
          "y": 0,
          "width": 100,
          "height": 100
        },
        {
          "x": 100,
          "y": 100,
          "width": 100,
          "height": 100
        },
        {
          "x": 100,
          "y": 200,
          "width": 100,
          "height": 100
        },
        {
          "x": 200,
          "y": 0,
          "width": 100,
          "height": 100
        },
        {
          "x": 200,
          "y": 100,
          "width": 100,
          "height": 100
        },
        {
          "x": 200,
          "y": 200,
          "width": 100,
          "height": 100
        }
      ]
    },
    {
      type: "KEY",
      player: 1,
      keys: "ABW"
    },
    {
      type: "TEXT",
      player: 1,
      regex: "OUI|NON",
      max_length: 3
    }
  ]
};
