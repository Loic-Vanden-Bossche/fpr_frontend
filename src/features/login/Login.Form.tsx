import {
  Form, Schema, SubmitHandler, emailSchema, passwordSchema
} from "../../lib";
import { formStyle } from "../../ui";
import { loginForm } from "./Login.style";

export function LoginForm() {
  const formSchemas: Schema[] = [emailSchema, passwordSchema];

  // eslint-disable-next-line no-console
  const handleFormSubmit: SubmitHandler = (data) => console.log(data);

  return <main css={loginForm}>
    <header>
      <h1>Welcome</h1>
      <p>Enter your credentials to connect.</p>
    </header>
    <Form schemas={formSchemas} onSubmit={handleFormSubmit} submitButtonText="Sign-in" style={formStyle}/>
  </main>;
}
