import { Icon, icons } from "../../lib";
import { colors } from "../../ui";
import { header } from "./NotAuthenticated.style";

export function NotAuthenticatedHeader() {
  return <header css={header}>
    <Icon icon={icons.logo} color={colors.white} size={"80px"}/>
    <section>
      <h1>Flash Player</h1>
      <h1>Revival</h1>
    </section>
  </header>;
}
