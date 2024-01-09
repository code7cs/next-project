"use client";

import { useRouter } from "next/navigation";
import { addUserToDatabase } from "../../server-actions/signUp/actions";

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
        placeholder="Enter your email"
        type="email"
        name="email"
      />

      <label className="label">
        <span className="label-text text-white">Password *</span>
      </label>
      <input
        className="input input-bordered w-full max-w-3xl text-darkgreen bg-white"
        placeholder="Enter your password"
        type="password"
        name="password"
      />

      <button
        className="btn btn-outline w-full max-w-3xl mt-8 mb-4 text-white"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
