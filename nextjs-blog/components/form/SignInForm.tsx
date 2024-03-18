"use client";

import SubmitButton from "./SubmitButton";
import ToastMessage from "../ToastMessage";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInForm = () => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const signInData = await signIn("credentials", {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      redirect: false,
    });
    console.log("signInData is: ", signInData);

    if (signInData?.error) {
      console.error(signInData.error);
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        clearTimeout(timer);
      }, 3000);
    } else {
      router.push("/about");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSignIn}>
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

      <SubmitButton text="Sign In" />

      {showToast && (
        <ToastMessage
          isSuccess={false}
          message="Invalid credentials. Please try again."
        />
      )}
    </form>
  );
};

export default SignInForm;
