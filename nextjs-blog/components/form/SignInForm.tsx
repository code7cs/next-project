"use client";

import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const router = useRouter();
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const signInData = await signIn("credentials", {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      redirect: false,
    });
    console.log("signInData is: ", signInData);

    if (signInData?.error) {
      // TODO: add some UI to show error message
      console.error(signInData.error);
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
    </form>
  );
};

export default SignInForm;
