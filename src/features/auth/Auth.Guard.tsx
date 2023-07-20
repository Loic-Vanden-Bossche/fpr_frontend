import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../../api";
import { authForm, authPage } from "./Auth.style";
import { AuthHeader } from "./Auth.Header";
import { useContext } from "react";
import { webRTCSocketContext } from "../../ws/webRTC.ts";
import { SignalMessage } from "../videoChat";

interface Props {
  shouldBeAuthenticated?: boolean
}

export function AuthGuard({ shouldBeAuthenticated = false }: Props) {
  const { isError } = useGetProfileQuery();

  const ws = useContext(webRTCSocketContext);

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
    }
    return <Outlet/>;
  }

  return null;
}
