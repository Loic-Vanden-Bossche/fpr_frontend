import { ChangeEventHandler } from "react";
import type { Data, Key, ModificationHandler } from "../types";
import { checkboxStyle } from "./Input.style";

interface Props{
  label: string;
  formKey: Key;
  form: Data;
  onValueChange: ModificationHandler;
}

export function BooleanInput({
  label, formKey, form, onValueChange
}: Props) {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onValueChange(formKey, Boolean(target.checked));
  };

  return <div className="booleanInput" css={checkboxStyle}>
    <input type={"checkbox"} value={form[formKey]?.toString()} onChange={handleInputChange}/>
    <label className="label">{label}</label>
  </div>;
}
