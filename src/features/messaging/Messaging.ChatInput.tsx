import { chatInput } from "./Messaging.style.ts";
import { Group } from "../../types";
import { inWhiteShadow } from "../../ui";
import { useContext, useState } from "react";
import { stompSocket } from "../../ws/messaging.ts";

interface Props {
  group: Group;
}

export function MessagingChatInput({ group }: Props) {
  const classes = [chatInput, inWhiteShadow];
  const [input, setInput] = useState("");
  const stomp = useContext(stompSocket);

  return (
    <form onSubmit={(e) => {
      if(input !== "") {
        stomp.publish({ destination: "/app/" + group.id + "/messages", body: JSON.stringify({ message: input }) });
        setInput("");
        e.preventDefault();
      }
      return false;
    }}>
      <textarea
        css={classes}
        placeholder={`Send a message to ${group.name}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input value={"Send"} type={"submit"}/>
    </form>
  );
}
