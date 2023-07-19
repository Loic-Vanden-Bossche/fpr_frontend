import { Route, Routes } from "react-router-dom";
import { LoginRoute } from "../login";
import { MessagingRoute } from "../messaging";
import { AuthGuard } from "../auth";

export function RoutingRouter() {
  return <Routes>
    <Route path="" element={<AuthGuard shouldBeAuthenticated/>}>
      <Route index element={null}/>
      <Route path="messaging" element={<MessagingRoute/>}/>
    </Route>
    <Route path="auth" element={<AuthGuard/>}>
      <Route path="login" element={<LoginRoute/>}/>
    </Route>
  </Routes>;
}
