import CredentialsSignInForm from "@/components/form/CredentialsSignInForm";
import GoogleSignInButton from "@/components/form/GoogleSignInButton";

export default async function SignIn() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center py-0 px-2 bg-darkgreen text-white">
        <CredentialsSignInForm />
        <div className="flex items-center gap-4 my-6 w-full max-w-3xl">
          <div className="flex-1 border-t border-white"></div>
          <span className="text-sm">or</span>
          <div className="flex-1 border-t border-white"></div>
        </div>
        <GoogleSignInButton />
      </div>
    </>
  );
}
