import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const InitialLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex flex-col justify-between items-start z-[1000] overflow-hidden"
      style={{ backgroundImage: "url('/pre-loader-bg.svg')" }}
    >
      {/* Background overlay */}
      <div className="bg-[#00FFBC]/90 w-full h-full fixed top-0 left-0 z-[900]" />

      {/* Background decorative elements */}
      <div className="absolute top-20 sm:top-25 right-5 sm:right-20 text-black text-6xl sm:text-7xl lg:text-9xl z-[950]">
        {'{'}
      </div>
      <div className="absolute top-48 sm:top-68 right-8 sm:right-42 text-black text-6xl sm:text-7xl lg:text-9xl z-[950]">
        {'}'}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center pl-8 sm:pl-20 z-[1000] relative">
        <div className="text-black text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
          Hire Best
        </div>
        <div className="text-black text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
          Developer in
        </div>

        {/* Location with pin icon */}
        <div className="flex items-center text-black text-4xl sm:text-6xl lg:text-7xl font-bold">
          <div className="w-8 sm:w-12 h-10 sm:h-16 mr-4 sm:mr-6 flex items-center justify-center">
            <Image src="/location.svg" alt="location" width={100} height={100} />
          </div>
          San Francisco
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="w-full px-6 sm:px-20 pb-8 sm:pb-12 z-[1000] relative flex items-center justify-end">
        <div className="w-[60%] sm:w-[40%] lg:w-[30%] bg-black rounded-full h-[4px] overflow-hidden">
          <div
            className="h-full bg-[#D9D9D9] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
