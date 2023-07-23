import {
  Value,
  Data,
  TextInputType,
  NumberInputType,
  BooleanInputType
} from ".";

export type Condition = {
    verificationMethod: (data: Value, record: Data) => boolean;
    errorMessage: string;
};

export type Schema = {
    key: string;
    label: string;
    placeholder?: string;
    type: TextInputType | NumberInputType | BooleanInputType;
    required: boolean;
    conditions?: Condition[];
};

export const transformSchemaToData = (data: Schema[]): Data =>
  data.reduce((acc, { key }) => ({
    ...acc,
    [key]: undefined
  }), {});

export const isDataSubmittable = (data: Schema[], record: Data): boolean =>
  data.every(({
    required, key, conditions
  }) =>
    (required ? record[key] : true) &&
    (conditions?.every(({ verificationMethod }) => verificationMethod(record[key], record)) ?? true)
  );
