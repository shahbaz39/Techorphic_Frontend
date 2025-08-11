'use client';

import Image from 'next/image';
import React from 'react';

export default function Technologies() {
  return (
    <div
      className="min-h-[100vh] w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="container mx-auto px-6 pt-20 pb-6 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-[400] font-overcame mb-4 leading-tight">
            <span className="block">We Work with the Best</span>
            <span className="block">Technologies in the Business</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-[#041913] max-w-xl mx-auto leading-relaxed">
            Got a new idea or an existing product? We’ve worked with both and built with the right
            tools to match. Here&apos;s where we shine:
          </p>
        </div>
        <div className="my-10">
          <div className="flex items-center justify-end">
            <div className="grid grid-cols-7 gap-4">
              {/* Laravel */}
              <div className="flex items-center justify-center">
                <Image src="/laravel.svg" alt="laravel" width={100} height={100} />
              </div>

              {/* Django - with orange circle */}
              <div className="flex items-center justify-center">
                <Image src="/vector.svg" alt="vector" width={50} height={50} />
              </div>

              {/* Blockchain */}
              <div className="flex items-center justify-center text-gray-600">
                <Image src="/java.svg" alt="java" width={40} height={40} />
              </div>

              {/* React */}
              <div className="flex items-center justify-center text-gray-600">
                <Image src="/blockchain.svg" alt="blockchain" width={100} height={100} />
              </div>

              {/* Node.js */}
              <div className="flex items-center justify-center text-gray-600">
                <Image src="/react.svg" alt="react" width={50} height={50} />
              </div>
              <div className="flex items-center justify-center text-gray-600">
                <Image src="/rails.svg" alt="rails" width={50} height={50} />
              </div>
              <div className="flex items-center  justify-center text-gray-600">
                <Image src="/nodejs.svg" alt="nodejs" width={50} height={50} />
              </div>
            </div>
            {/* Second Row */}
          </div>
          <div className="grid grid-cols-7 mt-12 gap-18  w-fit">
            {/* Python */}
            <div className="flex items-center  text-gray-600">
              <Image src="/python.svg" alt="python" width={50} height={50} />
            </div>

            {/* Android */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/android.svg" alt="android" width={50} height={50} />
            </div>

            {/* Apple */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/apple.svg" alt="apple" width={50} height={50} />
            </div>

            {/* Microsoft */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/windows.svg" alt="windows" width={50} height={50} />
            </div>

            {/* Other tools */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/d.svg" alt="d" width={30} height={30} />
            </div>

            <div className="flex items-center justify-center text-gray-600">
              <Image src="/j.svg" alt="j" width={20} height={20} />
            </div>

            <div className="flex items-center justify-center text-gray-600">
              <Image src="/php.svg" alt="php" width={50} height={50} />
            </div>

            {/* <div className="flex items-center justify-center text-gray-600">
                    <Image src="/cloud.svg" alt="cloud" width={50} height={50} />
                  </div> */}
          </div>
        </div>
        <p className="text-lg md:text-xl lg:text-2xl text-[#041913] max-w-xl leading-relaxed">
          We choose the best tech for your product, not the other way around.
        </p>
      </div>
    </div>
  );
}
