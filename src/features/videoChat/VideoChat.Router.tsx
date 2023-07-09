import {
  useContext, useEffect, useRef
} from "react";
import { CameraContext, useCamera } from "../../lib";

export function VideoChatRouter() {
  const video = useRef<HTMLVideoElement>(null);
  const { isLoading, stream } = useCamera();
  const {
    useVideo, switchUseVideo, useAudio, switchUseAudio
  } = useContext(CameraContext);

  useEffect(() => {
    if (video.current && stream ) {
      video.current.srcObject = stream;
      video.current.play();
    }
  }, [stream, video]);

  return <>
    {isLoading ? "loading" : "not loading"}
    <button onClick={switchUseVideo}>{useVideo ? "disable video" : "enable video"}</button>
    <button onClick={switchUseAudio}>{useAudio ? "disable audio" : "enable audio"}</button>
    {(useVideo && stream) && <video ref={video}/>}
  </>;
}
