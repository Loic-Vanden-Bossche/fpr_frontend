export type Message = {
  id: string;
  createdAt: Date;
  content: string;
  sender: string;
}

export function getDummyMessages (): Message[] {
  return [
    {
      id: "1",
      createdAt: new Date(),
      content: "Hello",
      sender: "Enzo"
    },
    {
      id: "2",
      createdAt: new Date(),
      content: "How are you?",
      sender: "Enzo"
    },
    {
      id: "3",
      createdAt: new Date(),
      content: "I'm fine, thanks!",
      sender: "John"
    },
    {
      id: "4",
      createdAt: new Date(),
      content: "What about you?",
      sender: "John"
    },
    {
      id: "5",
      createdAt: new Date(),
      content: "I'm fine too!",
      sender: "Enzo"
    },
    {
      id: "6",
      createdAt: new Date(),
      content: "Thanks!",
      sender: "Enzo"
    }
  ];
}
