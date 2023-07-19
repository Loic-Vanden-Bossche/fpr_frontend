/* eslint-disable no-console */
import {
  useContext, useEffect, useRef
} from "react";
import {
  CameraContext, Form, useCamera
} from "../../lib";

export function VideoChatRouter() {
  const video = useRef<HTMLVideoElement>(null);
  const { isLoading, stream } = useCamera();
  const {
    useVideo, switchUseVideo, useAudio, switchUseAudio
  } = useContext(CameraContext);

  const servers: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302"
        ]
      }
    ]
  };
  const peerConnection = new RTCPeerConnection(servers);
  peerConnection.onicecandidate = e => console.log("event", e?.candidate);

  const addStreams = (tracks: MediaStreamTrack[]) => {
    tracks.forEach(track => peerConnection.addTrack(track));

    // eslint-disable-next-line max-len
    peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer).then(() => console.log("offer", offer)));
  };

  const addConnection = (candidate: string) => {
    console.log(candidate);
    peerConnection.setRemoteDescription(new RTCSessionDescription({ type: "offer", sdp: candidate })).then(
      () => peerConnection.createAnswer().then(answer => {
        peerConnection.setLocalDescription(answer);
        console.log(answer);
      })
    );
  };

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
