import {loginPage} from "./Login.style.ts";
import {LoginHeader} from "./Login.Header.tsx";

export function LoginRoute() {
  return <section css={loginPage}>
    <LoginHeader/>
  </section>;
}