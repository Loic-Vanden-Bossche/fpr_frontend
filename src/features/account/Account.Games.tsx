import { useCreateGameMutation } from "../../api/games";
import { Data, Form, Schema, Value } from "../../lib";
import { isMinimalGames } from "../../types";
import { AccountGamesList } from "./Account.GamesList";
import { newGameForm, title } from "./Account.style";

export function AccountGames() {
  const [createGame] = useCreateGameMutation();

  const maxHigherThanMin = (min: Value, max: Value) => (min as number) <= (max as number);
  const schemas: Schema[] = [
    {
      key: "title",
      label: "title",
      type: "text",
      required: true
    },
    {
      key: "nbMinPlayers",
      label: "min players",
      type: "number",
      required: true,
      conditions: [
        {
          verificationMethod: (value) => value as number > 0,
          errorMessage: "cannot be 0 or less"
        },
        {
          verificationMethod: (value, record) => {
            if(record?.["nbMaxPlayers"]) { return maxHigherThanMin(value, record.nbMaxPlayers); }
            return true;
          },
          errorMessage: "cannot be higher than max players"
        }
      ]
    },
    {
      key: "nbMaxPlayers",
      label: "max players",
      type: "number",
      required: true,
      conditions: [
        {
          verificationMethod: (value) => value as number > 0,
          errorMessage: "cannot be 0 or less"
        },
        {
          verificationMethod: (value, record) => {
            if(record?.["nbMinPlayers"]) { return maxHigherThanMin(record.nbMinPlayers, value); }
            return true;
          },
          errorMessage: "cannot be lower than min players"
        }
      ]
    },
    {
      key: "isDeterministic",
      label: "is deterministic",
      type: "boolean",
      required: false
    }
  ];

  const handleFormSubmit = (e: Data) => isMinimalGames(e) && createGame(e);

  return <>
    <h1 css={title}>Your games</h1>
    <Form schemas={schemas} submitButtonText="Create new game" onSubmit={handleFormSubmit} style={newGameForm}/>
    <AccountGamesList />
  </>;
}
