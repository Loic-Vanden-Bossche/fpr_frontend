import {
  Value, Data, TextInputType
} from ".";

export type Condition = {
    verificationMethod: (data: Value) => boolean;
    errorMessage: () => boolean;
};

export type Schema = {
    key: string;
    label: string;
    type: TextInputType;
    required: boolean;
    conditions?: Condition[];
};

export const transformSchemaToData = (data: Schema[]): Data =>
  data.reduce((acc, {key}) => ({
    ...acc,
    [key]: undefined
  }), {});

export const isDataSubmittable = (data: Schema[], record: Data): boolean =>
  data.every(({
    required, key, conditions
  }) =>
    (required ? record[key] : true) &&
    (conditions?.every(({verificationMethod}) => verificationMethod(record[key])) ?? true)
  );

