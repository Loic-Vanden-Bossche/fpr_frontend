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
  const videoContainer = useRef<HTMLVideoElement>(null);
  const { isLoading, stream } = useCamera();
  const [reload, setReload] = useState(false);

  const {
    useVideo, switchUseVideo, useAudio, switchUseAudio
  } = useContext(CameraContext);

  // const { data: self } = useGetProfileQuery();

  const { data } = useGetGroupsQuery();

  const servers: RTCConfiguration = useMemo(() => ({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302"
        ]
      }]
  }), []);

  const peerConnection = useMemo(() =>{
    const pc = new RTCPeerConnection(servers);
    if(stream !== null){
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    }
    pc.ontrack = async ({ streams: [stream] }) => {
      if(videoContainer.current !== null){
        videoContainer.current.srcObject = stream;
        await videoContainer.current.play();
        setReload(prev => !prev);
      }
    };
    pc.oniceconnectionstatechange = () => {
      console.log("ICE STATE " + pc.iceConnectionState);
    };
    return pc;
  }, [stream, servers]);

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
        const pc = peerConnection;
        if(pc.iceConnectionState === "new"){
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
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
    }else if(m.type === "new-user"){
      const pc = peerConnection;
      await pc.setRemoteDescription(m.data.offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      const message = {
        type: "make-answer",
        data: {
          answer: answer,
          group: group?.id,
          to: m.data.from
        }
      };
      ws.send(JSON.stringify(message));
    } else if(m.type === "new-answer"){
      const pc = peerConnection;
      await pc.setRemoteDescription(m.data.answer);
    }
  };

  useEffect(() => {
    if (video.current && stream ) {
      video.current.srcObject = stream;
      video.current.play();
    }
  }, [stream, video]);

  useEffect(() => {
    console.log(reload);
  }, [reload]);

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
    <video ref={videoContainer}/>
  </>;

}
