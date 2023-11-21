"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <div className="container mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md">
        <div className="flex flex-col items-center justify-center gap-7 min-h-screen">
          <Image src={"/images/404.svg"} alt="404" width={300} height={300} />
          <h1 className="text-h3 font-bold text-center text-primary-700">
            No Result Found
          </h1>
          <p className="text-body text-center text-[#B0B0B0]">
            We couldn’t find what you searched for. Try searching again.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 rounded-lg bg-primary-700 text-white hover:bg-primary-600 transition-colors duration-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
