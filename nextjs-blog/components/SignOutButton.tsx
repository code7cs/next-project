"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      className="btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
      onClick={() => {
        signOut({
          redirect: true,
          callbackUrl: "/sign-in",
        });
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
