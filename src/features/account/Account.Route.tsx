import { useGetProfileQuery } from "../../api";
import { page, title } from "./Account.style";
import { AccountProfilePicture } from "./Account.ProfilePicture";
import { outPrimaryShadow } from "../../ui";
import { css } from "@emotion/react";
import { AccountNickname } from "./Account.Nickname";
import { AccountGames } from "./Account.Games";

export function AccountRoute() {
  const { data } = useGetProfileQuery();

  return <section css={css(page, outPrimaryShadow)}>
    <h1 css={title}>Your profile</h1>
    <AccountProfilePicture profile={data}/>
    <AccountNickname profile={data}/>
    <AccountGames />
  </section>;
}
