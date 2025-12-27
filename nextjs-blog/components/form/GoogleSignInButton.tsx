import { signIn } from "@/auth";

export default function GoogleSignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="btn btn-outline w-full max-w-3xl text-white hover:bg-white hover:text-darkgreen"
      >
        <i className="fab fa-google text-lg"></i>
        Sign in with Google
      </button>
    </form>
  );
}
