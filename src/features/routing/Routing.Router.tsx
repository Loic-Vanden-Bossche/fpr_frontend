import { Route, Routes } from "react-router-dom";
import { LoginRoute } from "../login";
import { MessagingRoute } from "../messaging";
import { Group, VideoChatRouter } from "../videoChat";

const group: Group = {
  "id": "67c202de-9b19-4617-9d56-4666f817fb23",
  "name": "Room test",
  "type": "GROUP",
  "members": [
    {
      "lastRead": "2023-07-16T09:10:47.095+00:00",
      "user": {
        "id": "4d5595f2-f748-4040-9241-cf48e49eba67",
        "email": "test@test.test",
        "role": "USER",
        "nickname": "Test",
        "coins": 0,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "picture": "false"
      }
    },
    {
      "lastRead": "2023-07-16T09:10:47.101+00:00",
      "user": {
        "id": "e971948b-55ab-41b3-89c0-36b587471589",
        "email": "denisft77@gmail.com",
        "role": "USER",
        "nickname": "Macaron",
        "coins": 0,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "picture": "true"
      }
    },
    {
      "lastRead": "2023-07-16T09:10:47.087+00:00",
      "user": {
        "id": "25adb162-e7d9-4d54-9013-27e5e4210527",
        "email": "denisft77@gmail.co",
        "role": "USER",
        "nickname": "Macaron2",
        "coins": 0,
        "updatedAt": new Date(),
        "createdAt": new Date(),
        "picture": "true"
      }
    }
  ]
};

export function RoutingRouter() {
  return <Routes>
    <Route index element={<VideoChatRouter group={group}/>}/>
    <Route path="login" element={<LoginRoute/>}/>
    <Route path="messaging" element={<MessagingRoute/>}/>
  </Routes>;
}
