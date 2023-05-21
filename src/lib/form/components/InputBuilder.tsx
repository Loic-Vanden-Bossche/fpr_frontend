import {
  FormData, TextInput, isTextInputType
} from ".";
import {FormModificationEvent, FormRecord} from "..";

interface Props {
    data: FormData;
    form: FormRecord;
    onValueChange: FormModificationEvent;
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
