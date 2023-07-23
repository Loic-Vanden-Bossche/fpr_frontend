import { ChangeEventHandler, useState } from "react";
import { RevealButton } from "../";
import type {
  Data, Key, ModificationHandler, TextInputType
} from "../types";
import { inputStyle } from "./Input.style";

interface Props{
  label: string;
  formKey: Key;
  form: Data;
  placeholder?: string;
  onValueChange: ModificationHandler;
  type?: TextInputType;
}

export function TextInput({
  label, formKey, form, placeholder, onValueChange, type
}: Props) {
  const [inputType, setInputType] = useState<TextInputType>(type ?? "text");

  const handleRevealIconClick = () =>
    setInputType(inputType === "password" ? "text" : "password");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    onValueChange(formKey, target.value);

  return <div className="textInput" css={inputStyle}>
    <header>
      <label className="label">{label}</label>
      {type === "password" && <RevealButton isHidden={inputType === "password"} onClick={handleRevealIconClick}/>}
    </header>
    <input type={inputType} value={form[formKey]?.toString()} placeholder={placeholder} onChange={handleInputChange}/>
  </div>;
}
