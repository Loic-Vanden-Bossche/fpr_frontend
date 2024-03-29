/* eslint-disable no-console */
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CameraContext, useCamera } from "../../lib";
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
  const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());

  const {
    useVideo, switchUseVideo, useAudio, switchUseAudio
  } = useContext(CameraContext);

  // const { data: self } = useGetProfileQuery();

  const { data } = useGetGroupsQuery();

  const servers: RTCConfiguration = useMemo(() => ({
    iceTransportPolicy: "relay",
    iceServers: [
      {
        urls: "stun:turn.flash-player-revival.net"
      },
      {
        urls: [
          "turn:turn.flash-player-revival.net"
        ],
        username: "fpr-turn",
        credential: "root"
      }]
  }), []);

  const createVideo = useCallback((id: string) => {
    const v = document.createElement('video');
    v.id = id;
    videoContainer.current?.appendChild(v);
    return v;
  }, []);

  const createPeerConnection = useCallback((id: string) => {
    const pc = new RTCPeerConnection(servers);
    setPeerConnections(prev => new Map(prev).set(id, pc));
    if(stream !== null){
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    }
    pc.ontrack = async (event) => {
      console.log("event", event);
      if(document.getElementById(id) !== null){
        console.log("already");
        return;
      }
      const v = createVideo(id);
      v.srcObject = event.streams[0];
      v.onplay = () => {
        console.log("PLAYED");
      };
      await v.play();
    };
    pc.onicecandidate = async (ev) => {
      ws.send(JSON.stringify({ type: "candidate", data: { to: id, candidate: ev.candidate } }));
    };
    pc.oniceconnectionstatechange = () => {
      console.log("ICE STATE " + pc.iceConnectionState);
    };
    return pc;
  }, [servers, stream, ws, createVideo]);

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

  ws.onmessage = async (message: MessageEvent<any>) => {
    const m = JSON.parse(message.data);
    if (m.type === "present") {
      for (const id of (m.data.presents as string[])) {
        const pc = createPeerConnection(id);
        if (pc.iceConnectionState === "new") {
          pc.onnegotiationneeded = async () => {
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
          };
        }
      }
    }
    else if (m.type === "new-user") {
      const pc = createPeerConnection(m.data.from);
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
    }
    else if (m.type === "new-answer") {
      const pc = peerConnections.get(m.data.from);
      if (!pc) {
        return;
      }
      await pc.setRemoteDescription(m.data.answer);
    }
    else if(m.type === "candidate") {
      const pc = peerConnections.get(m.data.from);
      if(!pc){
        return;
      }
      if(pc.currentRemoteDescription !== null){
        await pc.addIceCandidate(m.data.candidate);
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
        <button key={i}
          onClick={() => {
            setGroup(e);
          }}
        >{e.name}</button>
      )}
      <button onClick={() => setGroup(null)}>Remove</button>
    </div>
    <button onClick={switchUseVideo}>{useVideo ? "disable video" : "enable video"}</button>
    <button onClick={switchUseAudio}>{useAudio ? "disable audio" : "enable audio"}</button>
    <video ref={video}/>
    <div ref={videoContainer}/>
  </>;

}
