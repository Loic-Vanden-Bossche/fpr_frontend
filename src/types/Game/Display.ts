export type Display = {
  width: number;
  height: number;
  player: number;
  content: DisplayContent[];
}

export type DisplayContent = {
  tag: string;
} & Record<string, string>
