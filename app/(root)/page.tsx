import React from "react";

/* TODO: Homepage */

const Homepage = () => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="text-center p-10 bg-white shadow-lg rounded-[32px] max-w-3xl border-2 border-orange-200/25 drop-shadow-md shadow-sm shadow-orange-200/20">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to Infinify
          </h1>
          <p className="text-xl text-dark-500 mb-4">
            Unlock the potential of AI with our suite of powerful tools,
            including image generation, background removal, and more.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#"
              className="gradient-background text-white p-4 min-h-[56px] w-56 rounded-full font-bold hover:bg-orange-100 transition-all"
            >
              Explore Features
            </a>
            <a
              href="/sign-up"
              className="bg-gray-800 text-white p-4 min-h-[56px] w-56 rounded-full font-bold hover:bg-gray-600 transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 text-xs text-dark-400 italic">
        This is a temporary homepage
      </div>
    </>
  );
};

export default Homepage;
