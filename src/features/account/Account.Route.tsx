import { useGetProfileQuery, useLazyGetProfileQuery } from "../../api";
import { button, page, title } from "./Account.style";
import { AccountProfilePicture } from "./Account.ProfilePicture";
import { Button, outPrimaryShadow } from "../../ui";
import { css } from "@emotion/react";
import { AccountNickname } from "./Account.Nickname";
import { AccountGames } from "./Account.Games";

export function AccountRoute() {
  const { data } = useGetProfileQuery();
  const [retrigger] = useLazyGetProfileQuery();

  const logout = () => {
    localStorage.removeItem("token");
    retrigger();
  };

  return <section css={css(page, outPrimaryShadow)}>
    <h1 css={title}>Your profile</h1>
    <AccountProfilePicture profile={data}/>
    <AccountNickname profile={data}/>
    <Button onClick={logout} shadow={button}>Logout</Button>
    <AccountGames />
  </section>;
}
