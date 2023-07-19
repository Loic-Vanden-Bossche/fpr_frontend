/* eslint-disable no-console */
import {
  useContext, useEffect, useRef
} from "react";
import {
  CameraContext, Form, useCamera
} from "../../lib";

const ws = new WebSocket("wss://api.flash-player-revival.net/webrtc");

export function VideoChatRouter() {
  const video = useRef<HTMLVideoElement>(null);
  const video2 = useRef<HTMLVideoElement>(null);
  const { isLoading, stream } = useCamera();
  const {
    useVideo, switchUseVideo, useAudio, switchUseAudio
  } = useContext(CameraContext);

  ws.onopen = function (ev) {
    console.log(ev);
  };

  ws.onerror = function (err) {
    console.log(err);
  };

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


  peerConnection.oniceconnectionstatechange = () => {
    console.log(peerConnection.iceConnectionState);
  };

  const addStreams = (stream: MediaStream) => {
    console.log("Track added");
    stream.getTracks().forEach(track => {
      console.log(peerConnection.addTrack(track, stream));
    });

    console.log("Create offer");
    // eslint-disable-next-line max-len
    peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));
  };

  peerConnection.ontrack = ({streams: [stream]}) => {
    console.log("stream");
    if(video2.current !== null) {
      console.log(stream);
      video2.current.srcObject = stream;
      video2.current?.play();
    }
  };

  const callUser = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    ws.send(JSON.stringify(offer));
    console.log("send call");
  };

  ws.onmessage = async function (message: MessageEvent<string>) {
    const data: RTCSessionDescriptionInit = JSON.parse(message.data);
    if(data.type === "offer"){
      console.log("REceive offer");
      await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(message.data)));
      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(answer);
      ws.send(JSON.stringify(answer));
    }else if(data.type === "answer"){
      console.log("receive answer");
      peerConnection.setRemoteDescription(data);
    }
  };

  // const addConnection = (candidate: string) => {
  //   console.log(candidate);
  //   peerConnection.setRemoteDescription(new RTCSessionDescription({ type: "offer", sdp: candidate })).then(
  //     () => peerConnection.createAnswer().then(answer => {
  //       peerConnection.setLocalDescription(answer);
  //       console.log(answer);
  //     })
  //   );
  // };

  useEffect(() => {
    if (video.current && stream ) {
      video.current.srcObject = stream;
      video.current.play();
      addStreams(stream);
    }
  }, [stream, video]);

  return <>
    {isLoading ? "loading" : "not loading"}
    <button onClick={switchUseVideo}>{useVideo ? "disable video" : "enable video"}</button>
    <button onClick={switchUseAudio}>{useAudio ? "disable audio" : "enable audio"}</button>
    {(useVideo && stream) && <video ref={video}/>}
    <video ref={video2}/>
    <Form submitButtonText="initier connection"
      schemas={[
        {
          key: "ip",
          label: "ip",
          type: "text",
          required: true
        }
      ]}
      onSubmit={() => callUser()}
    />
  </>;

}
