import {
  useEffect, useRef, useState
} from "react";

export function VideoChatConnection() {
  const video = useRef(null);
  const [count, setCount] = useState(0);

  return <video ref={video}/>;
}
