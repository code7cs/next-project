import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const About = async () => {
  const session = await getServerSession(authOptions);

  let content = <h1>Please first login to see this page.</h1>;

  if (session?.user) {
    content = <h1>Hello {session.user.userName}, welcome to about page!</h1>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center py-0 px-2 bg-darkgreen text-white">
        {content}
      </div>
    </>
  );
};

export default About;
