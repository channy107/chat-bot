import { ReactNode } from "react";
import { create } from "zustand";

type ModalConfig = {
  content: ReactNode;
  title: string;
  description?: string;
};

type State = {
  isOpen: boolean;
  config?: ModalConfig;
};

type Action = {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
};

const useModalStore = create<State & Action>((set) => ({
  isOpen: false,
  config: undefined,
  openModal: (config) => set({ isOpen: true, config }),
  closeModal: () => set({ isOpen: false, config: undefined }),
}));

export { useModalStore };
