/* eslint-disable no-console */
import {
  useContext, useEffect, useMemo, useRef, useState
} from "react";
import {
  CameraContext, useCamera
} from "../../lib";
import { useGetGroupsQuery } from "../../api";
import { webRTCSocketContext } from "../../ws/webRTC.ts";
import { Group } from "../../types";

export interface SignalMessage {
  type: string,
  data: object
}

export function VideoChatRouter() {
  const ws = useContext(webRTCSocketContext);
  const video = useRef<HTMLVideoElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const { isLoading, stream } = useCamera();

  const {
    useVideo, switchUseVideo, useAudio, switchUseAudio
  } = useContext(CameraContext);

  // const { data: self } = useGetProfileQuery();

  const { data } = useGetGroupsQuery();

  const servers: RTCConfiguration = useMemo(() => ({
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302"
        ]
      }]
  }), []);

  const peerConnection = useMemo(() => new RTCPeerConnection(servers), [servers]);

  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    if(group !== null){
      const message: SignalMessage = {
        type: "connect",
        data: {
          group: group?.id
        }
      };
      ws.send(JSON.stringify(message));
      ws.send(JSON.stringify({ type: "presence" }));
    }
  }, [group, ws]);

  ws.onmessage = async (message) => {
    const m = JSON.parse(message.data);
    console.log(m);
    if(m.type === "present"){
      for(const id of (m.data.presents as string[])){
        if(peerConnection.iceConnectionState === "new"){
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          const message = {
            type: "call-group",
            data: {
              to: id,
              group: group?.id,
              offer: offer
            }
          };
          ws.send(JSON.stringify(message));
        }
      }
    }
  };

  useEffect(() => {
    if (video.current && stream ) {
      video.current.srcObject = stream;
      video.current.play();
    }
  }, [stream, video]);

  return <>
    {isLoading ? "loading" : "not loading"}
    <div>
      {data?.map((e, i) =>
        <button key={i} onClick={() => {
          setGroup(e);
        }}>{e.name}</button>
      )}
      <button onClick={() => setGroup(null)}>Remove</button>
    </div>
    <button onClick={switchUseVideo}>{useVideo ? "disable video" : "enable video"}</button>
    <button onClick={switchUseAudio}>{useAudio ? "disable audio" : "enable audio"}</button>
    <video ref={video}/>
    <div ref={videoContainer}/>
  </>;

}
