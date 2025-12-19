'use client';
import { ArrowUp } from 'lucide-react';

export default function Footer({ footer }: { footer: any }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!footer) return null; // wait for Strapi data

  return (
    <footer className="relative w-full bg-[#11E5AD] text-black">
      <div className="max-w-7xl mx-auto">
        {/* Company Name */}
        <div className="px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold pt-6 sm:pt-8 lg:pt-10">
            {footer.company_name || 'Techorphic'}
          </h3>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {/* Company Info */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-full sm:max-w-md lg:max-w-lg pr-0 sm:pr-4 lg:pr-8">
                {footer.description || ``}
              </p>
            </div>

            {/* Contact Info */}
            <div className="col-span-1 flex flex-col space-y-3 sm:space-y-4 text-sm sm:text-base order-2 sm:order-none">
              <div className="space-y-2 sm:space-y-3">
                <p className="font-medium">{footer.address || 'Sabzazar Scheme, Lahore'}</p>
                <p>
                  <a
                    href={`mailto:${footer.email || 'info@techorphic.com'}`}
                    className="hover:underline transition-all duration-200 hover:text-gray-700"
                  >
                    {footer.email || 'info@techorphic.com'}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${footer.phoneee || '+92 323 140 48 85?'}`}
                    className="hover:underline transition-all duration-200 hover:text-gray-700"
                  >
                    {footer.phone || '+92 323 140 48 85'}
                  </a>
                </p>
              </div>

              <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-semibold shadow-lg hover:bg-gray-800 transition-colors duration-200 w-fit mt-4 sm:mt-6 cursor-pointer">
                LET&apos;S DISCUSS
              </button>
            </div>

            {/* Social Media Links */}
            <div className="col-span-1 flex flex-col space-y-3 sm:space-y-4 order-1 sm:order-none">
              <div className="flex flex-row sm:flex-col space-x-3 sm:space-x-0 sm:space-y-3 lg:space-y-4">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-[#22CDA0] flex-1 sm:flex-none sm:w-32 lg:w-36 py-2 sm:py-3 rounded-md text-sm sm:text-base font-semibold shadow-lg hover:bg-gray-800 transition-colors duration-200 text-center"
                >
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/techorphic1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-[#22CDA0] flex-1 sm:flex-none sm:w-32 lg:w-36 py-2 sm:py-3 rounded-md text-sm sm:text-base font-semibold shadow-lg hover:bg-gray-800 transition-colors duration-200 text-center"
                >
                  Facebook
                </a>

                <a
                  href="https://www.linkedin.com/company/developerhousesoftware/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-[#22CDA0] flex-1 sm:flex-none sm:w-32 lg:w-36 py-2 sm:py-3 rounded-md text-sm sm:text-base font-semibold shadow-lg hover:bg-gray-800 transition-colors duration-200 text-center"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* To Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed right-4 sm:right-6 lg:right-8 bottom-4 sm:bottom-6 lg:bottom-8 bg-black text-white w-6 sm:w-7 lg:w-8 h-16 sm:h-20 lg:h-24 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-xs sm:text-sm uppercase font-semibold shadow-lg hover:bg-gray-800 transition-colors duration-200 z-50 cursor-pointer"
            aria-label="Scroll to top "
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 mb-1" />
            <span
              className="text-xs sm:text-sm cursor-pointer"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              TO TOP
            </span>
          </button>
        </div>

        {/* Copyright Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-t-2 border-black mx-4 sm:mx-6 lg:mx-8 text-sm sm:text-base lg:text-lg mt-12 sm:mt-16 lg:mt-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <p className="font-medium">
              All Rights Reserved | {footer.company_name || 'Techorphic'}
            </p>
            <p className="text-xs sm:text-sm text-gray-700">
              © {new Date().getFullYear()} {footer.company_name || 'Techorphic'} Developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
