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

  const peerConnection = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

  const addPeerConnection = useCallback((id: string, stream: MediaStream) => {
    const ve = addVideoElement(id);
    stream.getTracks().forEach((track: MediaStreamTrack) => {
      peerConnection.current.addTrack(track, stream);
    });
    peerConnection.current.ontrack = ({ streams: [stream] }) => {
      console.log(ve.srcObject, id);
      if(ve.srcObject === null){
        ve.srcObject = stream;
        console.log(ve, stream);
        ve.play().then((e) => {
          console.log("Played", e);
        }).catch((de) => {
          console.log("error", de);
        });
      }
    };
    return peerConnection.current;
  }, [servers]);

  useEffect(() => {
    if(videoContainer.current !== null){
      videoContainer.current.innerHTML = "";
      setVideoElements(new Map());
    }
    if(group !== null){
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
      // const button = document.createElement("button");
      videoElement.id = id;
      // button.onclick = () => videoElement.play();
      // button.innerText = "Play";
      setVideoElements(prev => prev.set(id, videoElement));
      videoContainer.current.appendChild(videoElement);
      // videoContainer.current.appendChild(button);
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
      const pc = peerConnection.current;
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
      const pc = peerConnection.current;
      console.log("pc", pc);
      if(pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
        console.log("remote", pc);
      }
    }else if(message.type === "present"){
      const data = message.data as {presents: string[]};
      for (const id of data.presents) {
        if(stream !== null && group !== null){
          const pc = addPeerConnection(id, stream);
          pc.oniceconnectionstatechange = () => {
            console.log(pc.iceConnectionState);
          };
          if(pc && pc.iceConnectionState === "new"){
            const offer = await pc.createOffer();
            await pc.setLocalDescription(new RTCSessionDescription(offer));
            const message: SignalMessage = {
              type: "call-group",
              data: { offer: offer, to: id, group: group?.id }
            };
            ws.send(JSON.stringify(message));
          }
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
