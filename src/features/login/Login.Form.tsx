import { useEffect } from "react";
import { useLazyGetProfileQuery, useLoginMutation } from "../../api";
import {
  Form, Schema, SubmitHandler, emailSchema, passwordSchema
} from "../../lib";
import { isLoginCredentials } from "../../types";
import { formStyle } from "../../ui";
import { Link } from "react-router-dom";

export function LoginForm() {
  const formSchemas: Schema[] = [emailSchema, passwordSchema];
  const [login, { data }] = useLoginMutation();
  const [retrigger] = useLazyGetProfileQuery();

  useEffect(() => {
    if(data) {
      localStorage.setItem('token', data.token);
      retrigger();
    }
  }, [data, retrigger]);

  const handleFormSubmit: SubmitHandler = (data) => isLoginCredentials(data) && login(data);

  return <>
    <header>
      <h1>Welcome</h1>
      <p>Enter your credentials to connect.</p>
    </header>
    <Form schemas={formSchemas} onSubmit={handleFormSubmit} submitButtonText="Sign-in" style={formStyle}/>
    <p>You don't have an account? <Link to={'/auth/register'}>Sign up</Link></p>
  </>;
}
