import { createElement } from "react";

interface Props{displayData: Display}

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

export function Game2DEngine({displayData: {content, height, width}}: Props) {
  const convertDisplayContentToHTML = (data: DisplayContent) => {
    const { content, tag } = data;
    const componentProps = { ...data, tag: undefined, content: undefined };
    return createElement(tag, componentProps, content);
  };

  return <svg height={height} width={width}>
    {content.map(convertDisplayContentToHTML)}
  </svg>;
}
