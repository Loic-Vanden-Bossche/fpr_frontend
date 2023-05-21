import {ChangeEventHandler, useState} from "react";
import {
  FormKey, FormModificationEvent, FormRecord
} from "../";

enum TextInputTypeValues {
  "password",
  "text"
}
export type TextInputType = keyof typeof TextInputTypeValues;
export const isTextInputType = (type: string): type is TextInputType =>
  Object.values(TextInputTypeValues).includes(type);

interface Props{
  label: string;
  formKey: FormKey;
  form: FormRecord;
  onValueChange: FormModificationEvent;
  type?: TextInputType;
}

export function TextInput({
  label, formKey, form, onValueChange, type
}: Props) {
  const [inputType, setInputType] = useState<TextInputType>(type ?? "text");

  const handleRevealIconClick = () =>
    setInputType(inputType === "password" ? "text" : "password");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({target}) =>
    onValueChange(formKey, target.value);

  return <div>
    <label>{label}</label>
    <input type={inputType} value={form[formKey]} onChange={handleInputChange}/>
    {type === "password" && <div onClick={handleRevealIconClick}>certe</div>}
  </div>;
}
