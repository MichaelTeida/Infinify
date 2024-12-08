import React from "react";

const Homepage = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center p-6 sm:p-8 lg:p-10 bg-white shadow-lg rounded-[28px] max-w-3xl w-full border-2 border-orange-200/25 drop-shadow-md shadow-sm shadow-orange-200/20">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            Welcome to Infinify
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-6 sm:mb-8">
            Unlock the potential of AI with our suite of powerful tools,
            including image generation, background removal, and more.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="gradient-background text-white p-3 sm:p-4 min-h-[48px] sm:min-h-[56px] w-full sm:w-56 rounded-full font-bold hover:bg-orange-100 transition-all text-sm sm:text-base"
            >
              Explore Features
            </a>
            <a
              href="/sign-up"
              className="bg-gray-800 text-white p-3 sm:p-4 min-h-[48px] sm:min-h-[56px] w-full sm:w-56 rounded-full font-bold hover:bg-gray-600 transition-all text-sm sm:text-base"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 text-xs text-gray-400 italic">
        This is a temporary homepage
      </div>
    </div>
  );
};

export default Homepage;
