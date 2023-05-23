import {Route, Routes} from "react-router-dom";
import {LoginRoute} from "../login";
import {MessagingRoute} from "../messaging";
import { GameRoute } from "../game";

export function RoutingRouter() {
  return <Routes>
    <Route index element={<GameRoute/>}/>
    <Route path="login" element={<LoginRoute/>}/>
    <Route path="messaging" element={<MessagingRoute/>}/>
  </Routes>;
}