import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-[#f9f7f3] flex flex-col items-center text-center py-16 px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 mb-4">
       What do you want to {" "}
        <span className="text-green-600">give</span> today?
      </h1>
      <p className="text-gray-800 max-w-xl mb-8">
        Write your interests, posts, blogs anonymously.
      </p>
      <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded mb-4">
       <a href="/add" className="underline hover:text-green-600">
          Write a Blog
        </a>
      </button>
      <p className="text-gray-900">
        Already have an account?{" "}
        <a href="#" className="underline hover:text-green-600">
          Sign in
        </a>
      </p>
    </section>
  );
};

export default HeroSection;
