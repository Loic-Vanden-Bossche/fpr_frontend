import type {
  Data, ModificationHandler, Schema
} from "..";
import { TextInput, isBooleanInputType, isNumberInputType, isTextInputType } from "..";
import { BooleanInput } from "./BooleanInput";
import { NumberInput } from "./NumberInput";

interface Props {
    data: Schema;
    form: Data;
    onValueChange: ModificationHandler;
}

export function InputSelector({
  data: {
    type,
    label,
    placeholder,
    key
  },
  form,
  onValueChange
}: Props) {
  if(isTextInputType(type)){
    return <TextInput
      type={type}
      label={label}
      placeholder={placeholder}
      formKey={key}
      form={form}
      onValueChange={onValueChange}
    />;
  }

  if (isNumberInputType(type)) {
    return <NumberInput
      label={label}
      placeholder={placeholder}
      formKey={key}
      form={form}
      onValueChange={onValueChange}
    />;
  }

  if (isBooleanInputType(type)) {
    return <BooleanInput
      label={label}
      formKey={key}
      form={form}
      onValueChange={onValueChange}
    />;
  }

  return <div>Unknown input type</div>;
}
