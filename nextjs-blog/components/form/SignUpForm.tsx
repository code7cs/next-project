"use client";

import { useRouter } from "next/navigation";
import { addUserToDatabase } from "../../server-actions/signUp/actions";
import SubmitButton from "./SubmitButton";

const SignUpForm = () => {
  const router = useRouter();
  const handleSignUp = async (formData: FormData) => {
    // use server-actions
    const { status, message, error } = await addUserToDatabase(formData);
    if (status === 201) {
      console.log(message);
      // redirect to sign-in page
      router.push("/sign-in");
    } else {
      console.error(error);
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
    </form>
  );
};

export default SignUpForm;
