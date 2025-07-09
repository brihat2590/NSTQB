export type EventType = {
    id: number;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
  };
  
  export type RegistrationType = {
    id: number;
    name: string;
    email: string;
    eventId: number;
  };
  