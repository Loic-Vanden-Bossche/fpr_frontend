/* eslint-disable no-console */
import { useMemo } from "react";
import { Form, Schema, SubmitHandler } from "../../lib";
import { Profile } from "../../types";
import { usernameForm } from "./Account.style";
import { useChangeNicknameMutation } from "../../api";

interface Props{
  profile?: Profile
}

export function AccountNickname({ profile }: Props) {
  const [changeNickname] = useChangeNicknameMutation();
  const schemas: Schema[] = useMemo(() => ([
    {
      key: "nickname",
      label: "nickname",
      type: "text",
      placeholder: profile?.nickname,
      required: false,
      conditions: []
    }
  ]), [profile]);

  const handleSubmit: SubmitHandler = (data) => {
    const newNickname = data["nickname"];
    if(newNickname) {
      changeNickname(newNickname);
    }
  };

  return <Form schemas={schemas} submitButtonText="save" onSubmit={handleSubmit} style={usernameForm}/>;
}
