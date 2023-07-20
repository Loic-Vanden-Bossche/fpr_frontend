/* eslint-disable no-console */
import {
  useCallback,
  useContext, useEffect, useMemo, useRef, useState
} from "react";
import {
  CameraContext, useCamera
} from "../../lib";
import { useGetGroupsQuery, useGetProfileQuery } from "../../api";
import { Group } from "../../types";
import { webRTCSocketContext } from "../../ws/webRTC.ts";

export interface SignalMessage {
  type: string,
  data: object
}

export function VideoChatRouter() {
  const ws = useContext(webRTCSocketContext);
  const video = useRef<HTMLVideoElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const { isLoading, stream } = useCamera();

  const [group, setGroup] = useState<Group|null>(null);

  const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
  const [, setVideoElements] = useState<Map<string, HTMLVideoElement>>(new Map());

  const { data: self } = useGetProfileQuery();

  const servers: RTCConfiguration = useMemo(() => ({
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302"
        ]
      }]
  }), []);

  const addPeerConnection = useCallback((id: string, stream: MediaStream) => {
    console.log("Create connexion for", id);
    const pc = new RTCPeerConnection(servers);
    setPeerConnections(prev => prev.set(id, pc));
    const ve = addVideoElement(id);
    stream.getTracks().forEach((track: MediaStreamTrack) => {
      pc.addTrack(track, stream);
    });
    pc.ontrack = ({ streams: [stream] }) => {
      ve.srcObject = stream;
      ve.play();
    };
    return pc;
  }, [servers]);

  useEffect(() => {
    if(videoContainer.current !== null){
      videoContainer.current.innerHTML = "";
      setVideoElements(new Map());
    }
    if(stream !== null && group !== null){
      group.members.filter(v => v.user.id !== self?.id).forEach((m) => {
        addPeerConnection(m.user.id, stream);
      });
      ws.send(JSON.stringify({ type: "connect", data: { group: group.id } }));
      ws.send(JSON.stringify({ type: "presence" }));
    }
  }, [stream, group, addPeerConnection, self?.id, ws]);

  const {
    useVideo, switchUseVideo, useAudio, switchUseAudio
  } = useContext(CameraContext);

  const { data } = useGetGroupsQuery();

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

  ws.onmessage = async (messageEv: MessageEvent<string>) => {
    const message: SignalMessage = JSON.parse(messageEv.data);
    if(message.type === "new-user"){
      const data = message.data as {offer: RTCSessionDescriptionInit, from: string};
      const pc = peerConnections.get(data.from);
      if(pc){
        await pc.setRemoteDescription(data.offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(new RTCSessionDescription(answer));
        const msg: SignalMessage = {
          type: "make-answer",
          data: {
            answer: answer,
            to: data.from,
            group: group?.id ?? ""
          }
        };
        ws.send(JSON.stringify(msg));
      }
    }else if(message.type === "new-answer"){
      const data = message.data as {answer: RTCSessionDescriptionInit, from: string};
      const pc = peerConnections.get(data.from);
      if(pc) {
        pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    }else if(message.type === "present"){
      const data = message.data as {presents: string[]};
      for (const id of data.presents) {
        const pc = peerConnections.get(id);
        if(pc && pc.iceConnectionState === "new"){
          const offer = await pc.createOffer();
          await pc.setLocalDescription(new RTCSessionDescription(offer));
          const message: SignalMessage = {
            type: "call-group",
            data: { offer: offer, to: id, group: group }
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
