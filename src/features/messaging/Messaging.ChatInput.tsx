import { chatInput } from "./Messaging.style.ts";
import { Group } from "../../types";
import { inWhiteShadow } from "../../ui";
import { useContext, useState } from "react";
import { stompSocket } from "../../ws/messaging.ts";
import { KeyboardEvent } from "react";

interface Props {
  group: Group;
}

export function MessagingChatInput({ group }: Props) {
  const classes = [chatInput, inWhiteShadow];
  const [input, setInput] = useState("");
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const stomp = useContext(stompSocket);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    switch (event.key) {
    case "Enter":
      event.preventDefault();
      isShiftPressed ? breakLine() : submitMessage();
      break;
    case "Shift":
      setIsShiftPressed(true);
      break;
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    switch (event.key) {
    case "Shift":
      setIsShiftPressed(false);
      break;
    }
  };

  const breakLine = () => setInput(prev => `${prev}\n`);

  const submitMessage = () => {
    if (input) {
      stomp.publish({ destination: "/app/" + group.id + "/messages", body: JSON.stringify({ message: input }) });
      setInput("");
    }
  };

  return <textarea
    css={classes}
    placeholder={`Send a message to ${group.name}`}
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
    onKeyUp={handleKeyUp}
  />;
}
