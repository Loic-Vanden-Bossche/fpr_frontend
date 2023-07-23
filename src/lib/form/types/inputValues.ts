enum TextInputTypeValues {
  "password",
  "text"
}
export type TextInputType = keyof typeof TextInputTypeValues;
export const isTextInputType = (type: string): type is TextInputType =>
  Object.values(TextInputTypeValues).includes(type);

enum NumberInputTypeValues {
  "number"
}
export type NumberInputType = keyof typeof NumberInputTypeValues;
export const isNumberInputType = (type: string): type is NumberInputType =>
  Object.values(NumberInputTypeValues).includes(type);

enum BooleanInputTypeValues {
  "boolean"
}
export type BooleanInputType = keyof typeof BooleanInputTypeValues;
export const isBooleanInputType = (type: string): type is NumberInputType =>
  Object.values(BooleanInputTypeValues).includes(type);
