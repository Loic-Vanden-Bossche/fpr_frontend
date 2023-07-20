import { createContext } from "react";

export const webRTCSocketContext = createContext<WebSocket>(new WebSocket("wss://api.flash-player-revival.net/webrtc"));
