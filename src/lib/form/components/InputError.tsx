import { useMemo } from "react";
import { Value, Schema } from "..";
import { inputErrorStyle } from "./InputError.style";

interface Props {
    value: Value;
    schema: Schema;
}

export function InputError({
  value, schema: {
    conditions, required, label
  }
}: Props) {
  const errors = useMemo(
    () => conditions?.filter(({ verificationMethod }) => !verificationMethod(value)) ?? [],
    [value, conditions]
  );

  if (value !== undefined) {
    if (errors.length){
      if (conditions?.length === 1) {
        return <p className="error" css={inputErrorStyle}>{errors?.[0].errorMessage}</p>;
      } else if (conditions && conditions.length > 1) {
        return <figure className="error" css={inputErrorStyle}>
          <figcaption>The {label} format you entered is wrong:</figcaption>
          <ul>{errors?.map(({ errorMessage }, index) => <li key={index}>{errorMessage}</li>)}</ul>
        </figure>;
      }
    } else if (required && !value) {
      return <p className="error" css={inputErrorStyle}>{label} cannot be empty</p>;
    }
  }

  return null;
}
