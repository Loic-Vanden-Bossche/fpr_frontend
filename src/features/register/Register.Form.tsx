import { useEffect } from "react";
import { useLazyGetProfileQuery, useRegisterMutation } from "../../api";
import { Form, Schema, SubmitHandler, emailSchema, passwordSchema, usernameSchema } from "../../lib";
import { isRegisterCredentials } from "../../types";
import { formStyle } from "../../ui";
import { Link } from "react-router-dom";

export function RegisterForm() {
  const formSchemas: Schema[] = [emailSchema, usernameSchema, passwordSchema];
  const [register, { data }] = useRegisterMutation();
  const [retrigger] = useLazyGetProfileQuery();

  useEffect(() => {
    if(data) {
      localStorage.setItem('token', data.token);
      retrigger();
    }
  }, [data, retrigger]);

  const handleFormSubmit: SubmitHandler = (data) => isRegisterCredentials(data) && register(data);

  return <>
    <header>
      <h1>Welcome</h1>
      <p>Enter your credentials to create an account.</p>
    </header>
    <Form
      schemas={formSchemas}
      onSubmit={handleFormSubmit}
      submitButtonText="Register a new account"
      style={formStyle}
    />
    <p>You already have an account? <Link to={'/auth/login'}>Sign-in</Link></p>
  </>;
}
