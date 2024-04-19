import { create } from "zustand";

type State = {
  messages: Array<{ message: string | null; senderType: string }>;
};

type Action = {
  updateMessages: (
    messages: Array<{ message: string | null; senderType: string }>
  ) => void;
};

const useMessageStore = create<State & Action>((set) => ({
  messages: [],
  updateMessages: (messages) =>
    set(() => ({
      messages: messages,
    })),
}));

export { useMessageStore };
