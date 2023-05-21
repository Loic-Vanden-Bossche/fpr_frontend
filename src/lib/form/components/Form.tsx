import {FormEvent, useMemo} from "react";
import {
  FormRecord,
  TextInputType, useForm
} from "..";
import {InputBuilder} from "./InputBuilder";

export type FormData = {
  key: string;
  label: string;
  type: TextInputType;
  required: boolean;
}
const transformDataToForm = (data: FormData[]): FormRecord =>
  data.reduce((acc, {key}) => ({
    ...acc,
    [key]: undefined
  }), {});
const isRecordSubmittable = (data: FormData[], record: FormRecord): boolean =>
  data.every(({required, key}) => required ? record[key] : true);

export type FormSubmitEvent = (data: FormRecord) => void;

interface Props {
  data: FormData[];
  onSubmit: FormSubmitEvent;
}

export function Form({data, onSubmit}: Props) {
  const defaultFormValue = useMemo(() => transformDataToForm(data), [data]);
  const {form: record, handleFormModification: handleRecordModification} = useForm(defaultFormValue);
  const isFormSubmittable = useMemo(() => isRecordSubmittable(data, record), [record, data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(record);
  };

  return <form onSubmit={handleSubmit}>
    {data.map(
      (field) => <InputBuilder key={field.key} data={field} form={record} onValueChange={handleRecordModification}/>
    )}
    <input type={"submit"} disabled={!isFormSubmittable}/>
  </form>;
}
