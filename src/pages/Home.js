import React from "react";

const Home = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-white text-[#1a1a1a] px-8 py-12 overflow-hidden">
      
      {/* 🎨 Background Doodles */}
      <img
        src="/assets/doodle-1.png"
        alt="doodle1"
        className="absolute top-10 left-8 w-32 pointer-events-none animate-float"
      />
      <img
        src="/assets/doodle-2.png"
        alt="doodle2"
        className="absolute top-1/4 right-10 w-56 pointer-events-none animate-rotateSoft"
      />
      <img
        src="/assets/doodle-3.png"
        alt="doodle3"
        className="absolute bottom-24 left-1/3 w-36 pointer-events-none animate-floatSlow"
      />
      <img
        src="/assets/doodle-4.png"
        alt="doodle4"
        className="absolute top-1/2 right-1/4 w-28 rotate-12 pointer-events-none animate-rotateSoft"
      />
      <img
        src="/assets/doodle-5.png"
        alt="doodle5"
        className="absolute bottom-12 right-10 w-28 -rotate-12 pointer-events-none animate-rotateSoft"
      />
      <img
        src="/assets/doodle-6.png"
        alt="doodle6"
        className="absolute top-3/4 left-5 w-32 pointer-events-none animate-floatSlow"
      />
      <img
        src="/assets/doodle-7.png"
        alt="doodle7"
        className="absolute top-0 right-1/3 w-28 pointer-events-none animate-float"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center tracking-wide relative z-10">
        Welcome to Our Notes App
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-md relative z-10">
        Save your thoughts, organize your ideas, and make notes effortlessly. 
        Just login and start your productivity journey today!
      </p>

      <a
        href="/login"
        className="relative z-10 px-8 py-3 bg-[#1a1a1a] text-white rounded-md font-semibold hover:scale-105 transition-all"
      >
        Login & Start
      </a>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl relative z-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Quick Notes</h2>
          <p className="text-gray-500">
            Jot down ideas in seconds and never lose your thoughts.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Organize</h2>
          <p className="text-gray-500">
            Keep your notes neat with tags and categories.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Access Anywhere</h2>
          <p className="text-gray-500">
            Login from any device and access your notes anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
