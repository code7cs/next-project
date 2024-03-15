import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../lib/auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav className="bg-gray-800 flex justify-between items-center p-4">
        <h1 className="text-white font-bold text-2xl">Eastern Spa</h1>
        {session?.user ? (
          <SignOutButton />
        ) : (
          <button className="btn btn-outline hover:bg-darkgreen text-white font-bold py-2 px-4 rounded-md">
            <Link href="/sign-in">Sign In</Link>
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
