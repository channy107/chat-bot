import { create } from "zustand";

type State = {
  model: string;
};

type Action = {
  updateModel: (model: string) => void;
};

const useModelStore = create<State & Action>((set) => ({
  model: "gpt-3.5-turbo",
  updateModel: (model: string) => set({ model }),
}));

export { useModelStore };
