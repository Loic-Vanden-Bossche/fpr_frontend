import { createContext } from "react";
import { Client } from "@stomp/stompjs";

export const stompSocket = createContext<Client>(new Client({
  brokerURL: "wss://api.flash-player-revival.net/socket",
  connectHeaders: {
    "Authorization": ""
  }
}));
