import { useContext, useEffect, useMemo } from "react";
import { useGetProfileQuery } from "../../api";
import { Navigate, Outlet } from "react-router-dom";
import { webRTCSocketContext } from "../../ws/webRTC";
import { stompSocket } from "../../ws/messaging";
import { SignalMessage } from "../videoChat";
import { page } from "./IsAuthenticated.style";
import { IsAuthenticatedHeader } from "./IsAuthenticated.Header";
import { gameStompSocket } from "../../ws/gaming.ts";

export function IsAuthenticatedGuard() {
  const authToken = useMemo(() => localStorage.getItem('token'), []);
  const { isError, isLoading } = useGetProfileQuery();

  const ws = useContext(webRTCSocketContext);
  const stomp = useContext(stompSocket);
  const gaming = useContext(gameStompSocket);

  useEffect(() => {
    if(authToken) {
      const msg: SignalMessage = {
        type: "identify",
        data: { jwt: authToken }
      };
      ws.onopen = () => {
        ws.send(JSON.stringify(msg));
      };
      stomp.connectHeaders = { "Authorization": authToken };
      gaming.connectHeaders = { "Authorization": authToken };
    }
  }, [authToken, ws, stomp, gaming]);

  if(!authToken || (!isLoading && isError)) { return <Navigate to={"/auth/login"}/>; }
  else if(isLoading) { return null; }
  return <section css={page}>
    <IsAuthenticatedHeader/>
    <Outlet/>
  </section>;
}
