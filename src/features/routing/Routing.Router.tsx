import {Route, Routes} from "react-router-dom";
import {LoginRoute} from "../login";
import {MessagingRoute} from "../messaging";

export function RoutingRouter() {
  return <Routes>
    <Route path="login" element={<LoginRoute/>}/>
    <Route path="messaging" element={<MessagingRoute/>}/>
  </Routes>;
}
