'use client'; // Keep 'use client' if there are any client-side interactions, even without motion
import Link from 'next/link'; // Import Link for navigation

export default function ServicesOverview() {
  const services = [
    {
      title: 'Software Solutions',
      items: [
        'Web Application Development',
        'Mobile App Development',
        'Cloud-Native Applications',
        'Blockchain Development',
        'MVP Development Services',
      ],
    },
    {
      title: 'Product & QA Services',
      items: [
        'Product Management & Strategy',
        'QA & Testing Services',
        'Maintenance & Optimization',
        'Landing Page Development',
      ],
    },
    {
      title: 'Cloud & Security Services',
      items: [
        'IoT Solutions',
        'Serverless Architecture',
        'Blockchain Solutions',
        'Cybersecurity Services',
      ],
    },
  ];

  const caseStudies = [
    {
      title: 'Skip Tracing Platform Development',
      size: 'large',
      imageUrl: '/placeholder.svg?height=400&width=700',
    },
    {
      title: 'Skip Tracing Platform',
      size: 'small',
      imageUrl: '/placeholder.svg?height=300&width=350',
    },
    {
      title: 'Branding',
      size: 'small',
      imageUrl: '/placeholder.svg?height=300&width=350',
    },
    {
      title: 'Skip Tracing Platform', // Second last card
      size: 'custom-60',
      imageUrl: '/placeholder.svg?height=300&width=420',
    },
    {
      title: 'Branding', // Last card
      size: 'custom-40',
      imageUrl: '/placeholder.svg?height=300&width=280',
    },
  ];

  return (
    <div
      className="min-h-[100vh] w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hero-bg-2.svg')" }}
    >
      {/* Background overlay for better readability, matching the image's light gradient */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800">
          Overview of Core Services <br /> and Solutions
        </h2>
        <p className="mb-12 font-[400] text-xl md:text-2xl text-center text-gray-700">
          Our Core Software <br /> Development Services
        </p>
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-transparent backdrop-blur-sm rounded-3xl border border-[#00A77B] p-8 h-full"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-emerald-600 mb-8 leading-tight max-w-[300px]">
                {service.title}
              </h3>
              <div className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="group/item">
                    <div className="flex items-center space-x-3">
                      {/* <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" /> */}
                      <p className="text-emerald-700 text-lg font-medium">{item}</p>
                    </div>
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-[.5px] bg-[#00A77B] mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Call to Action Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <p className="text-2xl md:text-3xl text-gray-700">Have a project in mind?</p>
            <p className="text-2xl md:text-3xl text-gray-700">Let&#39;s shape it together</p>
          </div>
          <button className="bg-black text-white px-12 py-3 rounded-md text-xl shadow-lg">
            Get a Free Estimation
          </button>
        </div>
      </div>

      {/* Case Studies Section - Added based on image */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800 uppercase">
          Case Studies
        </h2>
        <p className="mb-12 font-[400] text-xl md:text-2xl text-center text-gray-700">
          Our Work in Action
        </p>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-16 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`
                rounded-xl p-6 flex flex-col bg-[#D9D9D9] justify-end relative overflow-hidden
                ${study.size === 'large' ? 'md:col-span-10 h-[300px] md:h-[400px]' : ''}
                ${study.size === 'small' ? 'md:col-span-5 h-[200px] md:h-[300px]' : ''}
                ${study.size === 'custom-60' ? 'md:col-span-6 h-[200px] md:h-[300px]' : ''}
                ${study.size === 'custom-40' ? 'md:col-span-4 h-[200px] md:h-[300px]' : ''}
              `}
              style={{
                // backgroundImage: `url('${study.imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="relative z-10">
                <p className="text-xl font-[400] text-[#000000]">{study.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text and link */}
        <div className="text-center mb-16">
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            We take your business as our personal <br /> and deliver more than beyond the boundaries
          </p>
          <Link href="#" className="text-xl md:text-2xl text-gray-800 underline underline-offset-4">
            Explore Our Latest Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
