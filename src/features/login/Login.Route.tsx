import { loginPage } from "./Login.style.ts";
import { LoginHeader } from "./Login.Header.tsx";
import { LoginForm } from "./Login.Form.tsx";

export function LoginRoute() {
  return <section css={loginPage}>
    <LoginHeader/>
    <LoginForm/>
  </section>;
}
