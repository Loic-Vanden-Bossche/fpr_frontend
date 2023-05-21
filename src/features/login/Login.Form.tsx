import {
  Form, FormSubmitEvent, FormData
} from "../../lib";
import {loginForm} from "./Login.style";

export function LoginForm() {
  const formData: FormData[] = [
    {
      key: "email",
      label: "email",
      type: "text",
      required: true
    }, {
      key: "password",
      label: "password",
      type: "password",
      required: true
    }
  ];

  // eslint-disable-next-line no-console
  const handleFormSubmit: FormSubmitEvent = (data) => console.log(data);

  return <main css={loginForm}>
    <header>
      <h1>Welcome</h1>
      <p>Enter your credentials to connect.</p>
    </header>
    <Form data={formData} onSubmit={handleFormSubmit}/>
  </main>;
}
