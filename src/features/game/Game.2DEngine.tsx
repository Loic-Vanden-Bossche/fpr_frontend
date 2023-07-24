/* eslint-disable no-console */
import { createElement, useMemo, useRef, MouseEvent, useEffect } from "react";
import { ClickAction, ClickZone, DisplayContent, Game, KeyAction, TextAction } from "../../types";
import { form, gameDisplay } from "./Game.style";
import { css } from "@emotion/react";
import { outPrimaryShadow } from "../../ui";
import { Condition, Form, Schema } from "../../lib";

interface Props {
  game: Game,
  onAction: (action: object) => void
}

export function Game2DEngine({ game: { display, requested_actions }, onAction }: Props) {
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

    requested_actions?.forEach(action => {
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

  const verifyClick = (e: MouseEvent<SVGSVGElement>, clicks: ClickAction[]): {x: number, y: number} | null => {
    const coordinates = getClickCoordinates(e.currentTarget.getBoundingClientRect(), e.clientX, e.clientY);
    console.log(coordinates);
    return (clicks.length && !clicks.find(click => click.zones)) ||
      clicks.find(click => click.zones?.find(zone => isInZone(coordinates, zone))) ? coordinates : null;
  };

  const handleLeftClick = (e: MouseEvent<SVGSVGElement>) => {
    const coord = verifyClick(e, leftClicks);
    console.log(coord);
    if(coord === null){
      return;
    }
    onAction({ actions: [coord] });
  };
  const handleDoubleClick = (e: MouseEvent<SVGSVGElement>) => {
    const coord = verifyClick(e, doubleClicks);
    if(coord === null){
      return;
    }
    onAction({ actions: [coord] });
  };
  const handleAuxClick = (e: MouseEvent<SVGSVGElement>) => {
    switch (e.button) {
    case 1: {
      const coord = verifyClick(e, middleClicks);
      if (coord === null) {
        return;
      }
      onAction({ actions: [coord] });
      return;
    }
    case 2: {
      const coord = verifyClick(e, rightClicks);
      if (coord === null) {
        return;
      }
      onAction({ actions: [coord] });
      return;
    }
    }
    console.log(false);
  };

  useEffect(() => {
    const handleKeyPressed = (e: any) => {
      !keyActions.find(action => action.keys) ||
      keyActions.find(
        action => action.keys?.split('').map(letter => letter.toLowerCase()).includes(e.key.toLowerCase())
      ) ? console.log(true) : console.log(false);
    };

    if (keyActions.length) { window.addEventListener("keydown", handleKeyPressed); }

    else { window.removeEventListener("keydown", handleKeyPressed); }
    return () => window.removeEventListener("keydown", handleKeyPressed);
  }, [keyActions]);

  const schemas: Schema[] = useMemo(() => {
    const conditions: Condition[] = [];
    textActions.forEach(action => {
      if(action.regex) {
        conditions.push({
          verificationMethod: (data) => new RegExp(action.regex ?? "").test(data as string),
          errorMessage: `should correspond the regex /${action.regex}/`
        });
      }
      if(action.max_length) {
        conditions.push({
          verificationMethod: (data) => ((data as string)??"").length <= (action.max_length ?? 0),
          errorMessage: `cant't be longer than ${action.max_length}`
        });
      }
    });

    const schemas: Schema[] = [{
      type: "text",
      label: "",
      key: "text",
      required: false,
      conditions
    }];
    return schemas;
  }, [textActions]);

  return <section css={css(gameDisplay(!!textActions.length), outPrimaryShadow)}>
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
    {!!textActions.length &&
      <Form schemas={schemas} submitButtonText="submit" style={form} onSubmit={() => console.log(true)}/>
    }
  </section>;
}
