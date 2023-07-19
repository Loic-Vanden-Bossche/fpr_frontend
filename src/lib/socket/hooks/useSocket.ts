import { useEffect, useState } from "react";

export function useSocket() {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
  const [networkStream, setNetworkStream] = useState<readonly MediaStream[]>([]);

  useEffect(() => {
    const pc = new RTCPeerConnection();
    pc.ontrack = e => setNetworkStream(e.streams);
    setPeerConnection(pc);
  }, []);

  const addStreams = (tracks: MediaStreamTrack[]) => {
    const pc = peerConnection ?? new RTCPeerConnection();
    tracks.forEach(track => pc.addTrack(track));
    setPeerConnection(pc);
  };

  const addConnection = (candidateIp: string) => {
    const pc = peerConnection ?? new RTCPeerConnection();
    const candidate: RTCIceCandidateInit = { candidate: candidateIp };
    pc.addIceCandidate(candidate);
    setPeerConnection(pc);
  };

  return {
    addStreams,
    addConnection,
    networkStream
  };
}
