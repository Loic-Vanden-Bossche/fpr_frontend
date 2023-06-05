import { useState } from "react";
import { Data, ModificationHandler } from "../types";

export function useForm(defaultValue: Data) {
  const [formState, setFormState] = useState<Data>(defaultValue);

  const changeFormState: ModificationHandler = (key, newValue) => {
    setFormState({
      ...formState,
      [key]: newValue
    });
  };

  return {
    form: formState,
    handleFormModification: changeFormState
  };
}
