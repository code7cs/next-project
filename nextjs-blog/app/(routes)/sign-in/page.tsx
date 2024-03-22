import SignInForm from "@/components/form/SignInForm";

export default async function SignIn() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center py-0 px-2 bg-darkgreen text-white">
        <SignInForm />
      </div>
    </>
  );
}
