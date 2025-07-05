import React from "react";

const Navigate = () => {
  
  return (
    <section className="bg-[#f9f7f3] py-16 px-12 w-full ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Text */}
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Smarter notes with AI Transcribe
          </h2>
          <p className="text-gray-800 mb-6">
            Turn spoken words into organized, searchable notes in seconds.
            Evernote’s AI Transcribe feature automatically converts your audio
            into accurate text—perfect for meetings, lectures, or quick thoughts
            on the go. Save time, stay focused, and never miss a detail.
          </p>
          <a href="#" className="underline text-gray-900 hover:text-green-600">
            Take me there
          </a>
        </div>

        {/* Right: Image placeholder */}
        <div>
          <img
            src="./navigate1.jpeg"
            alt="AI Transcribe feature illustration"
            className="w-full rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default Navigate;
