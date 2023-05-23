import { createElement } from "react";
import { Display, DisplayContent } from ".";

interface Props{displayData: Display}

export function Game2DEngine({displayData: {content, height, width}}: Props) {
  const convertDisplayContentToHTML = (data: DisplayContent) => {
    const {content, tag} = data;
    const componentProps = {...data, tag: undefined, content: undefined};
    return createElement(tag, componentProps, content);
  };
  
  return <svg height={height} width={width}>
    {content.map(convertDisplayContentToHTML)}
  </svg>;
}