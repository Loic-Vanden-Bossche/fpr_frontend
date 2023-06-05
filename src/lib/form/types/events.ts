import {
  Data, Key, Value
} from ".";

export type SubmitHandler = (data: Data) => void;
export type ModificationHandler = (key: Key, newValue: Value) => void;
