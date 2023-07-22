import { chatInput } from "./Messaging.style.ts";
import { Group } from "../../types";
import { inWhiteShadow } from "../../ui";
import { useState } from "react";

interface Props {
  group: Group;
}

export function MessagingChatInput({ group }: Props) {
  const classes = [chatInput, inWhiteShadow];
  const [input, setInput] = useState("");
  return <textarea css={classes} placeholder={`Send a message to ${group.name}`} value={input} onChange={(e) => setInput(e.target.value)}/>;
}
