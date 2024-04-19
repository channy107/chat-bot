"use client";
import { ReactNode, useEffect } from "react";
import { getUser } from "@actions/user";
import { useUserStore } from "@stores/user";
import { isSuccessResponse } from "@lib/guard";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    const setUser = async () => {
      const currentUser = await getUser();
      if (isSuccessResponse(currentUser)) {
        updateUser(currentUser.data);
      }
    };

    setUser();
  }, [updateUser]);

  return <>{children}</>;
};

export default UserProvider;
