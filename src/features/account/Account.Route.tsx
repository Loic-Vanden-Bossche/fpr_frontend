import { useGetProfileQuery } from "../../api";
import { page } from "./Account.style";
import { AccountProfilePicture } from "./Account.ProfilePicture";
import { outPrimaryShadow } from "../../ui";
import { css } from "@emotion/react";
import { AccountNickname } from "./Account.Nickname";

export function AccountRoute() {
  const { data } = useGetProfileQuery();

  return <section css={css(page, outPrimaryShadow)}>
    <AccountProfilePicture profile={data}/>
    <AccountNickname profile={data}/>
  </section>;
}
