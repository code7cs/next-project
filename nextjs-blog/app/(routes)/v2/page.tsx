import Link from "next/link";

const V2 = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center py-0 px-2 bg-darkgreen text-white">
        <button className="btn btn-outline w-3/5 max-w-3xl mt-8 mb-4 text-white">
          <Link href="/about">Go to About</Link>
        </button>
      </div>
    </>
  );
};

export default V2;
