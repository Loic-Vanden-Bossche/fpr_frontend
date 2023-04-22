import {Route, Routes} from "react-router-dom";
import {LoginRoute} from "../login";

export function RoutingRouter() {
  return <Routes>
    <Route path="login" element={<LoginRoute/>}/>
  </Routes>;
}