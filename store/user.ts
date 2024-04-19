import { create } from "zustand";
import { TUser } from "@/types/db";

type State = {
  user: Partial<TUser>;
};

type Action = {
  updateUser: (user: Partial<TUser>) => void;
};

const useUserStore = create<State & Action>((set) => ({
  user: {
    id: "",
    email: "",
  },
  updateUser: (user) => set(() => ({ user: user })),
}));

export { useUserStore };
