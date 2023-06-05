import type {
  Data, ModificationHandler, Schema
} from "..";
import { TextInput, isTextInputType } from "..";

interface Props {
    data: Schema;
    form: Data;
    onValueChange: ModificationHandler;
}

export function InputSelector({
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
