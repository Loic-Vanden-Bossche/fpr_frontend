import { Route, Routes } from "react-router-dom";
import { LoginForm } from "../login";
import { MessagingRoute } from "../messaging";
import { AuthGuard } from "../auth";
import { RegisterForm } from "../register";
import { VideoChatRouter } from "../videoChat";

export function RoutingRouter() {
  return <Routes>
    <Route path="" element={<AuthGuard shouldBeAuthenticated/>}>
      <Route index element={<MessagingRoute/>}/>
    </Route>
    <Route path="auth" element={<AuthGuard/>}>
      <Route path="register" element={<RegisterForm/>}/>
      <Route path="login" element={<LoginForm/>}/>
    </Route>
    <Route path={"video"} element={<VideoChatRouter/>}/>
  </Routes>;
}
