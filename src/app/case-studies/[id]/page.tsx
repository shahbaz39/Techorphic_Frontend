// app/case-studies/[id]/page.tsx
import { fetchCaseStudyById } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CaseStudyDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function CaseStudyDetailsPage({ params }: CaseStudyDetailsPageProps) {
  const caseStudy = await fetchCaseStudyById(params.id);

  if (!caseStudy) {
    notFound();
  }

  // Extract data from the correct structure
  const title = caseStudy.title || 'Case Study';
  const description = caseStudy.description || 'No description available.';
  
  // Get the first image if available
  const imageData = caseStudy.case_studie_Image?.[0];
  const imageUrl = imageData?.case_studies_img?.url || '/placeholder-image.jpg';
  const pdfUrl = imageData?.case_studies_pdf?.url;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            &larr; Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            {title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-8">
            {description}
          </p>
          
          {/* PDF Download Button if available */}
          {pdfUrl && (
            <div className="mt-8 text-center">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Full Case Study PDF
              </a>
            </div>
          )}

          {/* Back to Case Studies Link */}
          <div className="mt-12 text-center">
            <Link 
              href="/#case-studies" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}