import { createElement, useMemo, useRef, MouseEvent, useEffect } from "react";
import { ClickAction, ClickZone, DisplayContent, Game, KeyAction, TextAction } from "../../types";
import { form, gameDisplay } from "./Game.style";
import { css } from "@emotion/react";
import { outPrimaryShadow } from "../../ui";
import { Form, Schema } from "../../lib";

interface Props {
  game: Game
}

export function Game2DEngine({ game: { display, requested_actions } }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const convertDisplayContentToHTML = (data: DisplayContent) => {
    const { content, tag } = data;
    const componentProps = { ...data, tag: undefined, content: undefined };

    const handleDetectedString = (detectedString: string) => {
      const trimmedString = detectedString.trim();
      return trimmedString === "svg{" ? `svg.gameEngine, .screen{` : `.gameEngine ${trimmedString}`;
    };

    const securedContent = tag === "style" ?
      content
        .replaceAll(/([#.a-zA-Z0-9 ]* ?)*{/g, handleDetectedString)
        .replaceAll(/}/g, "}\n") :
      content;

    return createElement(tag, componentProps, securedContent);
  };

  const { clickActions, keyActions, textActions } = useMemo(() => {
    const clickActions: ClickAction[] = [];
    const keyActions: KeyAction[] = [];
    const textActions: TextAction[] = [];

    requested_actions.forEach(action => {
      switch(action.type) {
      case "CLICK":
        clickActions.push(action);
        break;
      case "KEY":
        keyActions.push(action);
        break;
      case "TEXT":
        textActions.push(action);
        break;
      }
    });

    return { clickActions, keyActions, textActions };
  }, [requested_actions]);

  const { leftClicks, middleClicks, rightClicks, doubleClicks } = useMemo(() => {
    const leftClicks: ClickAction[] = [];
    const rightClicks: ClickAction[] = [];
    const middleClicks: ClickAction[] = [];
    const doubleClicks: ClickAction[] = [];

    clickActions.forEach(action => {
      if(!action.buttons || action.buttons?.includes("LEFT")) { leftClicks.push(action); }
      else if(action.buttons?.includes("RIGHT")) { rightClicks.push(action); }
      else if(action.buttons?.includes("MIDDLE")) { middleClicks.push(action); }
      else if(action.buttons?.includes("DOUBLE")) { doubleClicks.push(action); }
    });

    return { leftClicks, rightClicks, middleClicks, doubleClicks };
  }, [clickActions]);

  const getClickCoordinates = (
    { x, y, width, height }:DOMRect,
    clientX: number,
    clientY: number
  ): {x:number, y:number} => ({
    x: (clientX - x) / width * display.width,
    y: (clientY - y) / height * display.height
  });

  const isInZone = ({ x, y }: {x:number, y:number}, zone: ClickZone): boolean =>
    zone.x <= x && x <= zone.x + zone.width &&
    zone.y <= y && y <= zone.y + zone.height;

  const verifyClick = (e: MouseEvent<SVGSVGElement>, clicks: ClickAction[]): boolean => {
    const coordinates = getClickCoordinates(e.currentTarget.getBoundingClientRect(), e.clientX, e.clientY);
    return (clicks.length && !clicks.find(click => click.zones)) ||
      clicks.find(click => click.zones?.find(zone => isInZone(coordinates, zone))) ? true : false;
  };

  const handleLeftClick = (e: MouseEvent<SVGSVGElement>) => console.log(verifyClick(e, leftClicks));
  const handleDoubleClick = (e: MouseEvent<SVGSVGElement>) => console.log(verifyClick(e, doubleClicks));
  const handleAuxClick = (e: MouseEvent<SVGSVGElement>) => {
    switch (e.button) {
    case 1:
      console.log(verifyClick(e, middleClicks));
      return;
    case 2:
      console.log(verifyClick(e, rightClicks));
      return;
    }
    console.log(false);
  };

  useEffect(() => {
    const handleKeyPressed = e => {
      !keyActions.find(action => action.keys) ||
      keyActions.find(
        action => action.keys?.split('').map(letter => letter.toLowerCase()).includes(e.key.toLowerCase())
      ) ? console.log(true) : console.log(false);
    };

    if (keyActions.length) { window.addEventListener("keydown", handleKeyPressed); }

    else { window.removeEventListener("keydown", handleKeyPressed); }
    return () => window.removeEventListener("keydown", handleKeyPressed);
  }, [keyActions]);

  const schemas: Schema[] = [
    { label: "", key: "", type: "text", required: true }
  ];

  return <section css={css(gameDisplay(display.height, display.width), outPrimaryShadow)}>
    <section className="screen" onClick={() => svgRef.current?.focus}>
      <svg
        className="gameEngine"
        ref={svgRef}
        viewBox={`0 0 ${display.height} ${display.width}`}
        onContextMenu={e => e.preventDefault()}
        onClick={handleLeftClick}
        onAuxClick={handleAuxClick}
        onDoubleClick={handleDoubleClick}
      >
        {display.content.map(convertDisplayContentToHTML)}
      </svg>
    </section>
    {!!textActions.length && <Form schemas={schemas} submitButtonText="submit" style={form}/>}
  </section>;
}
