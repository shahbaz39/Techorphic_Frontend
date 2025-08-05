import Image from 'next/image';

export default function VideoSection() {
  return (
    <div
      className="md:min-h-screen w-full flex flex-col items-center justify-center px-4 py-20"
      style={{
        backgroundImage: "url('/hero-bg-2.svg')",
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Header Text */}
      <div className="text-center mb-8 max-w-4xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
          THE CHOICE OF
          <br />
          INDUSTRY LEADERS
        </h2>
        <p className="text-base md:text-3xl text-gray-700  max-w-2xl mx-auto">
          Take a behind-the-scenes look at how we build
          <br />
          digital transformation success stories.
        </p>
      </div>

      {/* Video Thumbnail */}
      <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/hero-bg-2.svg"
          alt="Video thumbnail with abstract flowing shapes"
          fill
          className="object-cover"
        />
        {/* Play Button Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-cover"
          style={{ backgroundImage: "url('/videobg.svg')" }}
        >
          <button className="bg-white/60 hover:bg-white backdrop-blur-2xl transition-colors duration-200 rounded-2xl p-5 px-10 shadow-lg group">
            <div className="w-0 h-0 border-l-[24px] border-l-gray-800 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent ml-2 group-hover:border-l-gray-900 transition-colors duration-200"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
