import { actions, header } from "./IsAuthenticated.style";
import { FriendsRoute } from "../friends";
import { Icon, icons } from "../../lib";
import { Button, colors, outPrimaryShadow } from "../../ui";
import { useNavigate } from "react-router-dom";

export function IsAuthenticatedHeader() {
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");
  const handleAccountClick = () => navigate("/account");

  return <header css={header}>
    <Icon icon={icons.logo} size="32px" color={colors.white} onClick={handleLogoClick}/>
    <div css={actions}>
      <Button shadow={outPrimaryShadow} onClick={handleAccountClick}>
        <Icon icon={icons.user} color={colors.white}/>
        account
      </Button>
      <FriendsRoute/>
    </div>
  </header>;
}
