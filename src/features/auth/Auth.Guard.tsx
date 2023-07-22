import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../../api";
import { authForm, authPage } from "./Auth.style";
import { AuthHeader } from "./Auth.Header";
import { useContext } from "react";
import { webRTCSocketContext } from "../../ws/webRTC.ts";
import { SignalMessage } from "../videoChat";
import { stompSocket } from "../../ws/messaging.ts";

interface Props {
  shouldBeAuthenticated?: boolean
}

export function AuthGuard({ shouldBeAuthenticated = false }: Props) {
  const { isError } = useGetProfileQuery();

  const ws = useContext(webRTCSocketContext);
  const stomp = useContext(stompSocket);

  if (shouldBeAuthenticated == isError) { return <Navigate to={`/${shouldBeAuthenticated ? "auth/login" : ""}`}/>; }

  if(!shouldBeAuthenticated) {
    return <section css={authPage}>
      <AuthHeader/>
      <main css={authForm}>
        <Outlet/>
      </main>
    </section>;
  }

  const identify = (jwt: string) => {
    const msg: SignalMessage = {
      type: "identify",
      data: { jwt: jwt }
    };
    ws.onopen = () => {
      ws.send(JSON.stringify(msg));
    };
  };

  if(shouldBeAuthenticated) {
    const token = localStorage.getItem("token");
    if(token !== null){
      identify(token);
      stomp.connectHeaders = { "Authorization": token };
      stomp.activate();
    }
    return <Outlet/>;
  }

  return null;
}
