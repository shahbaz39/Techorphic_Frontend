// components/CaseStudyDetail.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CaseStudyImage {
  id: number;
  case_studies_img: {
    url: string;
    alternativeText?: string;
  };
  case_studies_img_description?: any;
  case_studies_pdf?: {
    url: string;
  };
}

interface CaseStudy {
  id?: number;
  title: string;
  description: string;
  case_studie_Image?: CaseStudyImage[];
}

export default function CaseStudyDetail({ id }: { id: string }) {
  const router = useRouter();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Direct fetch for case study with index:', id);
        console.log('API URL:', process.env.NEXT_PUBLIC_STRAPI_URL);
        
        // CORRECT Strapi v4 query syntax - using individual query parameters
        const apiUrl = new URL(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage`);
        
        // Add populate parameters one by one
        apiUrl.searchParams.append('populate[case_studie]', 'true');
        apiUrl.searchParams.append('populate[case_studie][populate][case_studie_Image]', 'true');
        apiUrl.searchParams.append('populate[case_studie][populate][case_studie_Image][populate][case_studies_img]', 'true');
        apiUrl.searchParams.append('populate[case_studie][populate][case_studie_Image][populate][case_studies_pdf]', 'true');
        apiUrl.searchParams.append('populate[case_studie][populate][case_studie_Image][populate][case_studies_img_description]', 'true');
        
        console.log('Fetching from:', apiUrl.toString());
        
        // Direct fetch with correct syntax
        const response = await fetch(apiUrl.toString());
        
        console.log('Direct fetch response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Direct fetch data:', data);
        
        // Check if we have the expected data structure
        if (!data.data) {
          throw new Error('No data found in response');
        }
        
        // Access the data correctly for Strapi v4
        const caseStudies = data.data.attributes?.case_studie?.data || [];
        console.log('Case studies from direct fetch:', caseStudies);
        console.log('Number of case studies:', caseStudies.length);
        
        if (caseStudies.length === 0) {
          throw new Error('No case studies found in the response');
        }
        
        const index = parseInt(id) - 1;
        console.log('Looking for case study at index:', index);
        
        if (index < 0 || index >= caseStudies.length) {
          throw new Error(`Case study index ${index} not found. Only ${caseStudies.length} case studies available.`);
        }
        
        const foundCaseStudy = caseStudies[index];
        console.log('Found case study:', foundCaseStudy);
        
        if (!foundCaseStudy) {
          throw new Error('Case study found but is undefined');
        }
        
        // Extract attributes from the found case study
        const caseStudyData = foundCaseStudy.attributes || foundCaseStudy;
        setCaseStudy(caseStudyData);
      } catch (err: any) {
        console.error('Error in direct fetch:', err);
        setError(err.message || 'Failed to load case study. Please try again later.');
        setCaseStudy(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [id]);

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading case study...</div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-xl text-red-500">{error || 'Case study not found'}</div>
        <button 
          onClick={() => router.back()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const mainImage = caseStudy.case_studie_Image?.[0]?.case_studies_img?.data?.attributes || 
                   caseStudy.case_studie_Image?.[0]?.case_studies_img;
  const pdfUrl = caseStudy.case_studie_Image?.[0]?.case_studies_pdf?.data?.attributes?.url || 
                caseStudy.case_studie_Image?.[0]?.case_studies_pdf?.url;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold">{caseStudy.title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Image */}
          {mainImage && mainImage.url && (
            <div className="mb-6">
              <Image
                src={mainImage.url}
                alt={mainImage.alternativeText || caseStudy.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Description */}
          <p className="text-lg mb-4">{caseStudy.description}</p>

          {/* PDF Link */}
          {pdfUrl && (
            <div className="mt-6">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Download Case Study PDF
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}