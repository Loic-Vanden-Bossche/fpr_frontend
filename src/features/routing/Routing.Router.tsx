import { Route, Routes } from "react-router-dom";
import { LoginForm } from "../login";
import { MessagingRoute } from "../messaging";
import { RegisterForm } from "../register";
import { VideoChatRouter } from "../videoChat";
import { NotAuthenticatedGuard } from "../notAuthenticated";
import { IsAuthenticatedGuard } from "../isAuthenticated";
import { AccountRoute } from "../account";
import { GameRoute } from "../game/Game.Route.tsx";
import { GameResult } from "../game/Game.Result.tsx";

export function RoutingRouter() {
  return <Routes>
    <Route path="" element={<IsAuthenticatedGuard/>}>
      <Route index element={<MessagingRoute/>}/>
      <Route path="account" element={<AccountRoute/>}/>
      <Route path={"video"} element={<VideoChatRouter/>}/>
      <Route path={"room/:id"} element={<GameRoute/>}/>
      <Route path={"win"} element={<GameResult isWin/>}/>
      <Route path={"loose"} element={<GameResult isWin={false}/>}/>
    </Route>
    <Route path="auth" element={<NotAuthenticatedGuard/>}>
      <Route path="register" element={<RegisterForm/>}/>
      <Route path="login" element={<LoginForm/>}/>
    </Route>
  </Routes>;
}
