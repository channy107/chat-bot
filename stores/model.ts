import { create } from "zustand";
import { DEFAULT_MODEL } from "@/constants/openai";

type State = {
  model: string;
};

type Action = {
  updateModel: (model: string) => void;
};

const useModelStore = create<State & Action>((set) => ({
  model: DEFAULT_MODEL,
  updateModel: (model: string) => set({ model }),
}));

export { useModelStore };
