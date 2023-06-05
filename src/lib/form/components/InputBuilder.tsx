import {
  Data, ModificationHandler, Schema
} from "../types";
import { InputError } from "./InputError";
import { InputSelector } from "./InputSelector";

interface Props {
    data: Schema;
    form: Data;
    onValueChange: ModificationHandler;
}

export function InputBuilder(props: Props) {
  return <>
    <InputSelector {...props}/>
    <InputError value={props.form[props.data.key]} schema={props.data}/>
  </>;
}
