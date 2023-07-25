import { groupModale } from "./Messaging.style.ts";
import { useCreateGroupMutation, useGetFriendsQuery } from "../../api";
import { MessagingContactPictureImage } from "./Messaging.ContactPicture.Image.tsx";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  close: () => void;
  reload: () => void;
}

export function MessagingAddGroup({ close, reload }: Props) {

  const { data: friends } = useGetFriendsQuery();

  const [createGroup] = useCreateGroupMutation();

  const container = useRef<HTMLDivElement>(null);

  const modal = useRef<HTMLDivElement>(null);

  const [checked, setChecked] = useState<boolean[]>([]);

  const [name, setName] = useState("");

  useEffect(() => {
    if(container.current){
      container.current.addEventListener("click", e => {
        if(e.target === container.current){
          close();
        }
      });
    }
  }, [close]);

  useEffect(() => {
    setChecked(friends?.map(() => false) ?? []);
  }, [friends]);

  return <section css={groupModale} ref={container}>
    <div ref={modal}>
      {friends?.map((f, i) => <label key={f.id} htmlFor={f.id}>
        <MessagingContactPictureImage user={f}/>
        <p>{f.nickname}</p>
        <input type={"checkbox"} id={f.id} checked={checked[i]} onChange={() => {
          setChecked(prev => {
            const array = prev.slice(0);
            array[i] = !prev[i];
            return array;
          });
        }}/>
      </label>)}
      <input value={name} onChange={e => setName(e.target.value)}/>
      <button onClick={() => {
        if(name === "") {
          toast.error("Name must not be empty");
        }
        else if(checked.reduce((prev, current) => prev || current) === false) {
          toast.error("Select at least 1 friend");
        }
        else if(friends !== undefined) {
          createGroup({ name: name, users: checked.map((v, i) => v ? friends[i].id : "null").filter( v => v !== "null") }).then(() => {
            toast.success("Group created");
            reload();
            close();
          });
        }
      }}>Create group</button>
    </div>
  </section>;
}
