import {FormEvent, useMemo} from "react";
import {useForm} from "..";
import {InputBuilder} from "./InputBuilder";
import type {StyleProps} from "../..";
import {css as emotionCss} from "@emotion/react";
import {formStyle} from "./Form.style";
import {
  Schema, SubmitHandler, isDataSubmittable, transformSchemaToData
} from "../types";

interface Props extends StyleProps {
  data: Schema[];
  onSubmit: SubmitHandler;
  submitButtonText: string;
}

export function Form({
  data, onSubmit, submitButtonText, className, style
}: Props) {
  const css = emotionCss(formStyle, style);

  const defaultFormValue = useMemo(() => transformSchemaToData(data), [data]);
  const {form: record, handleFormModification: handleRecordModification} = useForm(defaultFormValue);
  const isFormSubmittable = useMemo(() => isDataSubmittable(data, record), [record, data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(record);
  };

  return <form className={className} css={css} onSubmit={handleSubmit}>
    <main>
      {data.map(
        (field) => <InputBuilder key={field.key} data={field} form={record} onValueChange={handleRecordModification}/>
      )}
    </main>
    <input type={"submit"} disabled={!isFormSubmittable} value={submitButtonText}/>
  </form>;
}
