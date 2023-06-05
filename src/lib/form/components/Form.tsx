import { FormEvent, useMemo } from "react";
import { useForm } from "..";
import { InputBuilder } from "./InputBuilder";
import type { StyleProps } from "../..";
import { css as emotionCss } from "@emotion/react";
import { formStyle } from "./Form.style";
import {
  Schema, SubmitHandler, isDataSubmittable, transformSchemaToData
} from "../types";

interface Props extends StyleProps {
  schemas: Schema[];
  onSubmit: SubmitHandler;
  submitButtonText: string;
}

export function Form({
  schemas, onSubmit, submitButtonText, className, style
}: Props) {
  const css = emotionCss(formStyle, style);

  const defaultFormValue = useMemo(() => transformSchemaToData(schemas), [schemas]);
  const { form, handleFormModification } = useForm(defaultFormValue);
  const isFormSubmittable = useMemo(() => isDataSubmittable(schemas, form), [form, schemas]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  return <form className={className} css={css} onSubmit={handleSubmit}>
    <main>
      {schemas.map(
        (schema) => <InputBuilder key={schema.key} data={schema} form={form} onValueChange={handleFormModification}/>
      )}
    </main>
    <input type={"submit"} disabled={!isFormSubmittable} value={submitButtonText}/>
  </form>;
}
