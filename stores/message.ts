import { create } from "zustand";
import { TMessage } from "@/types/db";

type State = {
  messages: Partial<TMessage>[];
};

type Action = {
  updateMessages: (messages: Partial<TMessage>[]) => void;
};

const useMessageStore = create<State & Action>((set) => ({
  messages: [],
  updateMessages: (messages) =>
    set(() => ({
      messages: messages,
    })),
}));

export { useMessageStore };
