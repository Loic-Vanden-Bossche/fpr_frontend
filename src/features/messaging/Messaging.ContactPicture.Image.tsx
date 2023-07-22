import { useMemo } from "react";
import { Profile } from "../../types";
import { groupPictureImage } from "./Messaging.style";

interface Props{
  user: Profile
}

export function MessagingContactPictureImage({ user }: Props) {
  const src = useMemo(() => user.picture?
    `https://medias.flash-player-revival.net/p/${user.id}` :
    `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${user.id}`, [user]);

  const { rotation, x, y, scale } = useMemo(() => {
    const generateNumber = (min: number, max: number) => Math.random() * (max - min) + min;
    return {
      rotation: generateNumber(-5, 5),
      x: generateNumber(-10, 10),
      y: generateNumber(-10, 10),
      scale: generateNumber(0.8, 1.2)
    };
  }, []);

  return <img
    key={user.email}
    css={groupPictureImage(rotation, x, y, scale)}
    src={src}
  />;
}
