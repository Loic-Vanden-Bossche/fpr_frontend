import { useMemo } from "react";
import { useGetProfileQuery } from "../../api/auth.ts";
import { Group } from "../../types";
import { outPrimaryFilter } from "../../ui/shadows.ts";
import { MessagingContactPicture } from "./Messaging.ContactPicture.tsx";
import { linearCell } from "./Messaging.style.ts";

interface Props {
  isSelected: boolean;
  contact: Group;
  onClick: () => void;
}

export function MessagingContactCell({
  contact, isSelected, onClick
}: Props) {
  const classes = [linearCell];
  const { data: self } = useGetProfileQuery();

  const members = useMemo(() => contact.members.filter(({ user }) => user.id !== self?.id), [contact, self]);

  return <li css={classes} className={isSelected ? "selected" : ""} onClick={onClick} >
    <MessagingContactPicture members={members} shadow={outPrimaryFilter}/>
    <p>{contact.name}</p>
  </li>;
}
