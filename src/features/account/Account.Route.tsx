import { useGetProfileQuery } from "../../api";
import { page } from "./Account.style";
import { AccountProfilePicture } from "./Account.ProfilePicture";
import { outPrimaryShadow } from "../../ui";
import { css } from "@emotion/react";

export function AccountRoute() {
  const { data } = useGetProfileQuery();

  return <section css={css(page, outPrimaryShadow)}>
    <AccountProfilePicture profile={data}/>
  </section>;
}
