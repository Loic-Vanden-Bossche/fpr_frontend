enum TextInputTypeValues {
  "password",
  "text"
}
export type TextInputType = keyof typeof TextInputTypeValues;
export const isTextInputType = (type: string): type is TextInputType =>
  Object.values(TextInputTypeValues).includes(type);
