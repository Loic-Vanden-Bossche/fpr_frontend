import { useGetProfileQuery } from "../../api";
import { page, title } from "./Account.style";
import { AccountProfilePicture } from "./Account.ProfilePicture";
import { outPrimaryShadow } from "../../ui";
import { css } from "@emotion/react";
import { AccountNickname } from "./Account.Nickname";

export function AccountRoute() {
  const { data } = useGetProfileQuery();

  return <section css={css(page, outPrimaryShadow)}>
    <h1 css={title}>Your profile</h1>
    <AccountProfilePicture profile={data}/>
    <AccountNickname profile={data}/>
    <h1 css={title}>Your games</h1>
  </section>;
}
