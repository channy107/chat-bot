import { create } from "zustand";

type State = {
  isOpen: boolean;
};

type Action = {
  setOpen: (open: boolean) => void;
};

const useSheetStore = create<State & Action>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));

export { useSheetStore };
