import {useState} from "react";

export type FormKey = string;
export type FormValue = undefined | string;

export type FormRecord = Record<FormKey, FormValue>;
export type FormModificationEvent = (key: FormKey, newValue: FormValue) => void;

export function useForm(defaultValue: FormRecord) {
  const [formState, setFormState] = useState<FormRecord>(defaultValue);
  
  const changeFormState: FormModificationEvent = (key, newValue) => {
    setFormState({
      ...formState,
      [key]: newValue,
    });
  };

  return {
    form: formState, 
    handleFormModification: changeFormState
  };
}