import { Condition, Schema } from "..";

const usernameConditions: Condition[] = [
  {
    verificationMethod: (data) => (data ?? '').length >= 3,
    errorMessage: "Your username cannot be shorter than 3 characters"
  },
  {
    verificationMethod: (data) => (data ?? '').length <= 30,
    errorMessage: "Your username cannot be longer than 30 characters"
  }
];

export const usernameSchema: Schema = {
  key: 'username',
  label: 'username',
  type: 'text',
  required: true,
  conditions: usernameConditions
};
