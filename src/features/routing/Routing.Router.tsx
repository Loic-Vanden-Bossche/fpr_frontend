import { Route, Routes } from "react-router-dom";
import { LoginRoute } from "../login";
import { MessagingRoute } from "../messaging";
import { VideoChatRouter } from "../videoChat";

export function RoutingRouter() {
  return <Routes>
    <Route index element={<VideoChatRouter/>}/>
    <Route path="login" element={<LoginRoute/>}/>
    <Route path="messaging" element={<MessagingRoute/>}/>
  </Routes>;
}
