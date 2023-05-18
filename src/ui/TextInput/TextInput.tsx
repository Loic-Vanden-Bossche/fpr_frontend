import {ChangeEventHandler, useState} from "react";
import {
  FormKey, FormModificationEvent, FormRecord
} from "../../lib";

export type TextInputType = "password" | "text";

interface Props{
  label: string;
  key: FormKey;
  form: FormRecord;
  onValueChange: FormModificationEvent;
  type?: TextInputType;
}

export function TextInput({
  label, key, form, onValueChange, type
}: Props) {
  const [
    inputType,
    setInputType
  ] = useState<TextInputType>(type ?? "text");

  const handleRevealIconClick = () =>
    setInputType(inputType === "password" ? "text" : "password");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({target}) =>
    onValueChange(key, target.value);

  return <div>
    <label>{label}</label>
    <input type={inputType} value={form[key]} onChange={handleInputChange}/>
    {type === "password" && <div onClick={handleRevealIconClick}>certe</div>}
  </div>;
}
