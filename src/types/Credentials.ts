export type LoginCredentials = {
  email: string,
  password: string
}

export const isLoginCredentials = (data: Record<string, unknown>): data is LoginCredentials =>
  "email" in data &&
  "password" in data &&
  typeof data.email === "string" &&
  typeof data.password === "string";

export type RegisterCredentials = {
  username: string
} & LoginCredentials

export const isRegisterCredentials = (data: Record<string, unknown>): data is RegisterCredentials =>
  "email" in data &&
  "username" in data &&
  "password" in data &&
  typeof data.email === "string" &&
  typeof data.username === "string" &&
  typeof data.password === "string";
