/* eslint-disable no-console */
import {
  useContext, useEffect, useRef, useState
} from "react";
import {
  CameraContext, Form, useCamera
} from "../../lib";

const ws = new WebSocket("wss://api.flash-player-revival.net/webrtc");

interface SignalMessage {
  type: string,
  data: object
}

type Profile = {
  id: string;
  email: string;
  role: string;
  nickname: string;
  coins: number;
  updatedAt: Date;
  createdAt: Date;
  picture: string;
}

type GroupMember = {
  lastRead: string,
  user: Profile
}

export type Group = {
  id: string,
  name: string,
  type: string,
  members: GroupMember[]
}

export function VideoChatRouter(props: {group: Group}) {
  const video = useRef<HTMLVideoElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const { isLoading, stream } = useCamera();
  const [init, setInit] = useState(false);
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

  const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
  const [videoElements, setVideoElements] = useState<Map<string, HTMLVideoElement>>(new Map());


  console.log(videoElements);

  useEffect(() => {
    if(stream !== null && !init){
      props.group.members.forEach((m) => {
        addPeerConnection(m.user.id, stream);
      });
      setInit(true);
    }
  }, [stream, init, props.group]);

  const addPeerConnection = (id: string, stream: MediaStream) => {
    const pc = new RTCPeerConnection(servers);
    setPeerConnections(prev => prev.set(id, pc));
    const ve = addVideoElement(id);
    console.log("video", ve);
    stream.getTracks().forEach((track: MediaStreamTrack) => {
      pc.addTrack(track, stream);
    });
    pc.ontrack = ({ streams: [stream] }) => {
      console.log("stream", stream);
      ve.srcObject = stream;
    };
    pc.onconnectionstatechange = () => {
      console.log(pc.connectionState);
    };
  };

  console.log(peerConnections);

  const addVideoElement = (id: string) => {
    if(videoContainer.current !== null){
      const videoElement = document.createElement('video');
      videoElement.id = id;
      setVideoElements(prev => prev.set(id, videoElement));
      videoContainer.current.appendChild(videoElement);
      return videoElement;
    } else {
      throw Error();
    }
  };

  // const removeConnection = (id: string) => {
  //   setPeerConnections(prev => {
  //     prev.delete(id);
  //     return prev;
  //   });
  //   setVideoElements(prev => {
  //     const ve = prev.get(id);
  //     if(videoContainer.current && ve){
  //       videoContainer.current.removeChild(ve);
  //     }
  //     prev.delete(id);
  //     return prev;
  //   });
  // };

  const callGroup = async (id: string) => {
    const pc = peerConnections.get(id);
    if(pc && pc.iceConnectionState === "new"){
      const offer = await pc.createOffer();
      await pc.setLocalDescription(new RTCSessionDescription(offer));
      const message: SignalMessage = {
        type: "call-group",
        data: { offer: offer, to: id }
      };
      ws.send(JSON.stringify(message));
    }
  };

  ws.onmessage = async (messageEv: MessageEvent<string>) => {
    const message: SignalMessage = JSON.parse(messageEv.data);
    console.log(message.data);
    if(message.type === "new-user"){
      const data = message.data as {offer: RTCSessionDescriptionInit, from: string};
      const pc = peerConnections.get(data.from);
      console.log("Couou", pc);
      if(pc){
        await pc.setRemoteDescription(data.offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(new RTCSessionDescription(answer));
        const msg: SignalMessage = {
          type: "make-answer",
          data: {
            answer: answer,
            to: data.from
          }
        };
        ws.send(JSON.stringify(msg));
      }
    }else if(message.type === "new-answer"){
      const data = message.data as {answer: RTCSessionDescriptionInit, from: string};
      const pc = peerConnections.get(data.from);
      console.log("LOLOL", pc);
      if(pc) {
        pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    }
  };

  const identify = (id: string) => {
    const msg: SignalMessage = {
      type: "identify",
      data: { me: id}
    };
    ws.send(JSON.stringify(msg));
  };

  /*const peerConnection = new RTCPeerConnection(servers);

  peerConnection.oniceconnectionstatechange = () => {
    console.log(peerConnection.iceConnectionState);
  };*/

  // const addStreams = (stream: MediaStream) => {
  //   console.log("Track added");
  //   stream.getTracks().forEach(track => {
  //     console.log(peerConnection.addTrack(track, stream));
  //   });
  //
  //   console.log("Create offer");
  //   // eslint-disable-next-line max-len
  //   peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));
  // };

  // ws.onmessage = async function (message: MessageEvent<string>) {
  //   const data: RTCSessionDescriptionInit = JSON.parse(message.data);
  //   if(data.type === "offer"){
  //     console.log("REceive offer");
  //     await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(message.data)));
  //     const answer = await peerConnection.createAnswer();
  //     peerConnection.setLocalDescription(answer);
  //     ws.send(JSON.stringify(answer));
  //   }else if(data.type === "answer"){
  //     console.log("receive answer");
  //     peerConnection.setRemoteDescription(data);
  //   }
  // };

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
    }
  }, [stream, video]);

  return <>
    {isLoading ? "loading" : "not loading"}
    <button onClick={switchUseVideo}>{useVideo ? "disable video" : "enable video"}</button>
    <button onClick={switchUseAudio}>{useAudio ? "disable audio" : "enable audio"}</button>
    <video ref={video}/>
    <div ref={videoContainer}/>
    <Form schemas={[
      {
        key: "id",
        label: "id",
        type: "text",
        required: true
      }
    ]} onSubmit={e => identify(e["id"] ?? "")} submitButtonText={"identifier"}
    />
    <Form submitButtonText="initier connection"
      schemas={[
        {
          key: "user",
          label: "user",
          type: "text",
          required: true
        }
      ]}
      onSubmit={e => callGroup(e["user"] ?? "")}
    />
  </>;

}
