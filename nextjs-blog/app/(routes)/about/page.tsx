import Navbar from "../../../components/Navbar";
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";

const About = async () => {
  const session = await getServerSession(authOptions);

  let content = <h1>Please first login to see this page.</h1>;

  if (session?.user) {
    content = (
      <>
        <h1 className="font-medium mb-8">
          Hello{" "}
          <span className="font-medium text-xl">{session.user.userName}</span>,
          welcome back!
        </h1>
        <h1 className="font-medium mb-8">Here is About Page.</h1>
      </>
    );
  }

  return (
    <>
      <div className="h-20">
        <Navbar />
      </div>
      <div className="h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-0 px-2 bg-darkgreen text-white">
        {content}
      </div>
    </>
  );
};

export default About;
