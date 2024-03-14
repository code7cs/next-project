import SignUpForm from "../../../components/form/SignUpForm";

export default async function SignUp() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center py-0 px-2 bg-darkgreen text-white">
        <SignUpForm />
      </div>
    </>
  );
}
