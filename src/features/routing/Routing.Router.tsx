import { Route, Routes } from "react-router-dom";
import { LoginForm } from "../login";
import { MessagingRoute } from "../messaging";
import { RegisterForm } from "../register";
import { VideoChatRouter } from "../videoChat";
import { NotAuthenticatedGuard } from "../notAuthenticated";
import { IsAuthenticatedGuard } from "../isAuthenticated";

export function RoutingRouter() {
  return <Routes>
    <Route path="" element={<IsAuthenticatedGuard/>}>
      <Route index element={<MessagingRoute/>}/>
      <Route path={"video"} element={<VideoChatRouter/>}/>
    </Route>
    <Route path="auth" element={<NotAuthenticatedGuard/>}>
      <Route path="register" element={<RegisterForm/>}/>
      <Route path="login" element={<LoginForm/>}/>
    </Route>
  </Routes>;
}
