export type Contact = {
  id: string;
  name: string;
  profilePic: string;
}

export function getDummyContacts (): Contact {
  return {
    id: "oui",
    name: "John",
    profilePic: "https://api.dicebear.com/6.x/notionists-neutral/svg?seed=Enzo"
  };
}
