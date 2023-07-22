import { header } from "./IsAuthenticated.style";
import { FriendsRoute } from "../friends";
import { Icon, icons } from "../../lib";
import { colors } from "../../ui";
import { redirect } from "react-router-dom";

export function IsAuthenticatedHeader() {
  const handleLogoClick = () => redirect("/");
  return <header css={header}>
    <Icon icon={icons.logo} size="32px" color={colors.white} onClick={handleLogoClick}/>
    <FriendsRoute/>
  </header>;
}
