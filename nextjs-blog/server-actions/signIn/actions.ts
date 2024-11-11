"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const signInByCredentials = async (formData: FormData) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid credentials", status: 401 };
    }
    throw error; // Let the redirect happen for successful login
  }
};
