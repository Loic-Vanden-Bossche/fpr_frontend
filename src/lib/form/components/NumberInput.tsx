import { ChangeEventHandler } from "react";
import type { Data, Key, ModificationHandler } from "../types";
import { inputStyle } from "./Input.style";

interface Props{
  label: string;
  formKey: Key;
  form: Data;
  placeholder?: string;
  onValueChange: ModificationHandler;
}

export function NumberInput({
  label, formKey, form, placeholder, onValueChange
}: Props) {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    onValueChange(formKey, Number(target.value));

  return <div className="numberInput" css={inputStyle}>
    <header>
      <label className="label">{label}</label>
    </header>
    <input type={"number"} value={form[formKey]?.toString()} placeholder={placeholder} onChange={handleInputChange}/>
  </div>;
}
