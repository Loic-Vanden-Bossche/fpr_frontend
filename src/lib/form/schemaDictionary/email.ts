import { Condition, Schema } from "..";

const emailConditions: Condition[] = [
  {
    verificationMethod: (data) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(data ?? ''),
    errorMessage: 'Please enter a valid email address'
  }
];

export const emailSchema: Schema = {
  key: 'email',
  label: 'email',
  type: 'text',
  required: true,
  conditions: emailConditions
};
