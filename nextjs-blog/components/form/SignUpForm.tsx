"use client";

import SubmitButton from "./SubmitButton";
import ToastMessage from "../ToastMessage";
import { addUserToDatabase } from "@/server-actions/signUp/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (formData: FormData) => {
    // use server-actions
    const { status, message, error } = await addUserToDatabase(formData);
    if (status === 201) {
      console.log(message);
      router.push("/sign-in");
    } else {
      console.error(error);
      setErrorMessage(error ?? "Sign up failed.");
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        clearTimeout(timer);
      }, 3000);
    }
  };

  return (
    <form action={handleSignUp}>
      <label className="label">
        <span className="label-text text-white">Email *</span>
      </label>
      <input
        className="input input-bordered w-full max-w-3xl text-darkgreen bg-white"
        name="email"
        placeholder="Enter your email"
        required
        type="email"
      />

      <label className="label">
        <span className="label-text text-white">Password *</span>
      </label>
      <input
        className="input input-bordered w-full max-w-3xl text-darkgreen bg-white"
        name="password"
        placeholder="Enter your password"
        required
        type="password"
      />

      <SubmitButton text="Sign Up" />

      {showToast && <ToastMessage isSuccess={false} message={errorMessage} />}
    </form>
  );
};

export default SignUpForm;
