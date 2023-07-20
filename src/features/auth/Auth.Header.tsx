import { colors } from "../../ui";
import { Icon, icons } from "../../lib";
import { authHeader } from "./Auth.style";

export function AuthHeader() {
  return <header css={authHeader}>
    <Icon icon={icons.logo} color={colors.white} size={"80px"}/>
    <section>
      <h1>Flash Player</h1>
      <h1>Revival</h1>
    </section>
  </header>;
}
