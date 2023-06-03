import {TextInput} from ".";
import {
  Data, ModificationHandler, Schema, isTextInputType
} from "../types";

interface Props {
    data: Schema;
    form: Data;
    onValueChange: ModificationHandler;
}

export function InputBuilder({
  data: {
    type,
    label,
    key
  },
  form,
  onValueChange
}: Props) {
  switch (true) {
  case isTextInputType(type):
    return <TextInput type={type} label={label} formKey={key} form={form} onValueChange={onValueChange}/>;
  default:
    return <div>Unknown input type</div>;
  }
}
