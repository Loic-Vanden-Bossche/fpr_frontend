
export type ClickZone = {
  x:number,
  y:number,
  width:number,
  height:number
}

export type ClickButton = "LEFT" | "RIGHT" | "MIDDLE" | "DOUBLE"

export type ClickAction = {
  type: "CLICK";
  zones?: ClickZone[];
  buttons?: ClickButton[];
  confirm?: boolean;
}

export type KeyAction = {
  type: "KEY";
  player: number;
  keys?: string;
  confirm?: boolean;
}

export type TextAction = {
  type: "TEXT";
  player: number;
  regex?: string;
  max_length?: number;
}

export type Action = ClickAction | KeyAction | TextAction;
