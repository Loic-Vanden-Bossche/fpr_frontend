import {Icon, icons} from "../..";
import {revealButtonStyle} from "./RevealButton.style";

interface Props {
    isHidden: boolean;
    onClick: () => void;
}

export function RevealButton({onClick, isHidden}: Props) {
  return <Icon
    onClick={onClick}
    className="revealButton"
    icon={isHidden ? icons.crossed_eye : icons.eye}
    style={revealButtonStyle}
  />;
}
