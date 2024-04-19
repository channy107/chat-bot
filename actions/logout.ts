"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "@actions/sessions";

export const logout = async () => {
  deleteSession();
  redirect("/");
};
