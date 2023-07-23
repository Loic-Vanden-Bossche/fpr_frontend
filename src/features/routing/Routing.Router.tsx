import { Route, Routes } from "react-router-dom";
import { LoginForm } from "../login";
import { MessagingRoute } from "../messaging";
import { RegisterForm } from "../register";
import { VideoChatRouter } from "../videoChat";
import { NotAuthenticatedGuard } from "../notAuthenticated";
import { IsAuthenticatedGuard } from "../isAuthenticated";
import { AccountRoute } from "../account";
import { GamesRoute } from "../games/Games.Route.tsx";
import { GameRoute } from "../game/Game.Route.tsx";

export function RoutingRouter() {
  return <Routes>
    <Route path="" element={<IsAuthenticatedGuard/>}>
      <Route index element={<MessagingRoute/>}/>
      <Route path="account" element={<AccountRoute/>}/>
      <Route path={"video"} element={<VideoChatRouter/>}/>
      <Route path={"room/:id"} element={<GamesRoute/>}/>
      <Route path={"test/game"} element={<GameRoute/>}/>
    </Route>
    <Route path="auth" element={<NotAuthenticatedGuard/>}>
      <Route path="register" element={<RegisterForm/>}/>
      <Route path="login" element={<LoginForm/>}/>
    </Route>
  </Routes>;
}
