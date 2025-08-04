import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="w-full px-6 py-16 pb-[8rem]">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="flex flex-col w-full justify-between">
          {/* Left Column - Main Heading */}
          <div className="w-[50%]">
            <h1
              className="font-normal leading-[80px] tracking-[-0.017em] text-[#020209]"
              style={{
                fontSize: '68px',
                fontFamily: 'Overcame Demo, system-ui, -apple-system, sans-serif',
                textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
                verticalAlign: 'middle',
              }}
            >
              BUILDING
              <br />
              SOFTWARE
              <br />
              THAT FITS
              <br />
              YOUR BUSINESS
              <br />
              GOALS
            </h1>
          </div>

          {/* Right Column - Description */}
          <div className="flex items-end justify-end transform -translate-y-13">
            <div className="w-[35%]">
              <p
                className="font-normal leading-[110%] tracking-[-0.017em] text-[#030208] text-right"
                style={{
                  fontSize: '40px',
                  fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                  verticalAlign: 'middle',
                }}
              >
                We build software that supports your business goals by giving you better visibility,
                smoother collaboration, and higher productivity.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Icons */}
        <div className="mb-16 w-[50%]">
          <div className="grid grid-cols-8">
            {/* Laravel */}
            <div className="flex items-center justify-center">
              <Image src="/laravel.svg" alt="laravel" width={70} height={70} />
            </div>

            {/* Django - with orange circle */}
            <div className="flex items-center justify-center">
              <Image src="/vector.svg" alt="vector" width={30} height={30} />
            </div>

            {/* Blockchain */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/java.svg" alt="java" width={20} height={20} />
            </div>

            {/* React */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/blockchain.svg" alt="blockchain" width={80} height={80} />
            </div>

            {/* Node.js */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/react.svg" alt="react" width={30} height={30} />
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/rails.svg" alt="rails" width={30} height={30} />
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/nodejs.svg" alt="nodejs" width={30} height={30} />
            </div>

            {/* Second Row */}
          </div>
          <div className="grid grid-cols-8 mt-4">
            {/* Python */}
            <div className="flex items-center  text-gray-600">
              <Image src="/python.svg" alt="python" width={30} height={30} />
            </div>

            {/* Android */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/android.svg" alt="android" width={30} height={30} />
            </div>

            {/* Apple */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/apple.svg" alt="apple" width={30} height={30} />
            </div>

            {/* Microsoft */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/windows.svg" alt="windows" width={30} height={30} />
            </div>

            {/* Other tools */}
            <div className="flex items-center justify-center text-gray-600">
              <Image src="/d.svg" alt="d" width={18} height={18} />
            </div>

            <div className="flex items-center justify-center text-gray-600">
              <Image src="/j.svg" alt="j" width={13} height={13} />
            </div>

            <div className="flex items-center justify-center text-gray-600">
              <Image src="/php.svg" alt="php" width={30} height={30} />
            </div>

            {/* <div className="flex items-center justify-center text-gray-600">
              <Image src="/cloud.svg" alt="cloud" width={30} height={30} />
            </div> */}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="space-y-12">
          {/* Quote */}
          <p className="font-[300] text-[36px] leading-[110%] tracking-[-1.7%]">
            Your users deserve more than just functional technology, <br /> they deserve an
            exceptional experience.
          </p>

          {/* Description */}
          <p className="font-[300] text-[36px] leading-[110%] tracking-[-1.7%] max-w-5xl">
            Techorphic’s software development services deliver scalable, intuitive solutions like
            apps processing over 1M payments monthly and tools speeding up healthcare signups by
            40%. We&#39;re your success partner.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link
              href="/services"
              className="bg-[#00FFBC] text-[#000000] px-5 h-11 items-center justify-between flex rounded-md font-bold text-center"
            >
              Our Services
            </Link>
            <Link
              href="/estimate"
              className="bg-[#000000] text-[#fff] px-5 h-11 items-center justify-between flex rounded-md font-bold text-center"
            >
              Get a Free Estimation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
