import { Form, Schema } from "../../lib";
import { title } from "./Account.style";

export function AccountGames() {
  const schemas: Schema[] = [
    {
      key: "title",
      label: "title",
      type: "text",
      required: true
    },
    {
      key: "nbMinPlayers",
      label: "minimal number of players",
      type: "number",
      required: true
    },
    {
      key: "nbMaxPlayers",
      label: "maximal number of players",
      type: "number",
      required: true
    },
    {
      key: "isDeterministic",
      label: "is deterministic",
      type: "boolean",
      required: false
    }
  ];

  return <>
    <h1 css={title}>Your games</h1>
    <Form schemas={schemas} submitButtonText="Create new game" onSubmit={e => console.log(e)}/>
  </>;
}
