import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const About = async () => {
  const session = await getServerSession(authOptions);
  console.log("session is: ", session);
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center py-0 px-2 bg-darkgreen text-white">
        <h1>Hello {session?.user?.name}, welcome to about page!</h1>
      </div>
    </>
  );
};

export default About;
