/* eslint-disable no-console */
import {
  useContext, useEffect, useRef, useState
} from "react";
import {
  CameraContext, Form, useCamera, useForm
} from "../../lib";
import { useSocket } from "../../lib/socket";

export function VideoChatRouter() {
  const video = useRef<HTMLVideoElement>(null);
  const { isLoading, stream } = useCamera();
  const {
    useVideo, switchUseVideo, useAudio, switchUseAudio
  } = useContext(CameraContext);
  const {
    addStreams, addConnection, networkStream
  } = useSocket();

  // eslint-disable-next-line no-console
  console.log(networkStream);

  useEffect(() => {
    if (video.current && stream ) {
      video.current.srcObject = stream;
      video.current.play();
      addStreams(stream.getTracks());
    }
  }, [stream, video]);

  return <>
    {isLoading ? "loading" : "not loading"}
    <button onClick={switchUseVideo}>{useVideo ? "disable video" : "enable video"}</button>
    <button onClick={switchUseAudio}>{useAudio ? "disable audio" : "enable audio"}</button>
    {(useVideo && stream) && <video ref={video}/>}
    <Form submitButtonText="initier connection"
      schemas={[
        {
          key: "ip",
          label: "ip",
          type: "text",
          required: true
        }
      ]}
      onSubmit={e => addConnection(e["ip"] ?? "")}
    />
  </>;

}
