import { Profile } from "../../types";
import { infoText } from "./Friends.style";

interface Props{
  friends?: Profile[]
}

export function FriendsList({ friends }: Props) {
  if (!friends) { return <p css={infoText}>Friends list is loading...</p>; }
  if (!friends.length) { return <p css={infoText}>No friends has been found</p>; }
  return <>
    <ul>
      {friends.map(friend => <li key={friend.email}>{friend.nickname}</li>)}
    </ul>
  </>;
}
