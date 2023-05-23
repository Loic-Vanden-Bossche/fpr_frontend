import { useState } from "react";
import { Game2DEngine } from "./Game.2DEngine";

export type Display = {
  player: number;
  width: number;
  height: number;
  content: DisplayContent[];
}

export type DisplayContent = {
  tag: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fill?: string;
  content?: string;
}

export function GameRoute() {
  const [isIn3D, setIsIn3D] = useState(false);
  const game: Display = {
    player:1,
    width:640,
    height:480,
    content: [
      {
        tag: "rect",
        x:10,
        y:10,
        width:620,
        height:460,
        fill:"red"
      },
      {
        tag:"text",
        x:320,
        y:240,
        fill:"white",
        content:"hello"
      },
      {
        tag: "rect",
        x:120,
        y:210,
        width:62,
        height:46,
        fill:"purple"
      },
    ]
  };
  
  return isIn3D ? null : <Game2DEngine displayData={game}/>;
}