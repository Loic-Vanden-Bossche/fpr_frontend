import {
  colors, Icon, icons
} from "../../ui";
import {loginHeader} from "./Login.style.ts";

export function LoginHeader() {
  return <header css={loginHeader}>
    <Icon icon={icons.logo} color={colors.white} size={"80px"}/>
    <section>
      <h1>Flash Player</h1>
      <h1>Revival</h1>
    </section>
  </header>;
}
