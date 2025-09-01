import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHomepage = async () => {
  try {
    const response = await api.get('/homepage', {
      params: {
        populate: {
          logo: true,
          navigation_link: true,
          technology: {
            populate: ['icon'],
          },
          cta_buttons: true,
          Brand_Items: true,
          stats: true,
          Brand_logos: true,
          IndustryLeadersChoiceSection: {
            populate: ['features', 'choice_video'],
          },
          WhoWeAre: {
            populate: ['focus_areas'],
          },
          CoreSolution: {
            populate: {
              ServicesCategory: {
                populate: ['servicename'],
              },
            },
          },
          case_studie: {
            populate: ['case_studie_Image'],
          },
          ClientTestimonial: {
            populate: ['testimonialItem'],
          },
          FAQSection: {
            populate: ['faqitem'],
          },
          Footer: {
            // ✅ properly closed
            populate: {
              social_links: {
                populate: ['icon'],
              },
            },
          },
        },
      },
    });

    const data = response.data.data;
    console.log('✅ Fetched homepage data:', data);

    if (Array.isArray(data.IndustryLeadersChoiceSection)) {
      data.IndustryLeadersChoiceSection = data.IndustryLeadersChoiceSection[0] || null;
    }
    if (Array.isArray(data.ClientTestimonial)) {
      data.ClientTestimonial = data.ClientTestimonial[0] || null;
    }

    return data;
  } catch (error) {
    console.error('❌ Error fetching homepage:', error.response?.data || error);
    return null;
  }
};

export const submitAuditRequest = async (formData) => {
  try {
    const mapBudgetToStrapiFormat = (budget: string) => {
      const budgetMap: Record<string, string> = {
        '$5K-$10K': 'Under_5k',
        '$10K-$25K': 'From_5k_to_20k',
        '$25K-$50K': 'From_20k_to_50k',
        '$50K-$100K': 'From_50k_to_100k',
        '$100K+': 'Above_100k',
      };
      return budgetMap[budget] || budget;
    };

    const mapServiceToStrapiFormat = (service: string) => {
      const serviceMap: Record<string, string> = {
        Website: 'Web Development',
        'Mobile App': 'Mobile App Development',
        'Web App': 'Web Development',
        SEO: 'Digital Marketing',
        'UI/UX': 'UI/UX Design',
        Cloud: 'Cloud Solutions',
        Other: 'Other',
      };
      return serviceMap[service] || service;
    };

    const requestData = {
      data: {
        name: formData.name,
        email: formData.email,
        companyName: formData.company,
        technologies: formData.technologies,
        referralSource: formData.howHear,
        services: formData.selectedServices || [],
        budget: formData.selectedBudget || [],
        message: formData.message,
      },
    };

    const response = await api.post('/free-audit-request-submissions', requestData);
    return response.data;
  } catch (error) {
    console.error('❌ Error submitting form:', error.response?.data || error);
    throw error;
  }
};

export const fetchBlogs = async () => {
  try {
    const response = await api.get('/blogs', {
      params: {
        sort: ['date:desc'],
        populate: {
          thumbnail: true,
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error fetching blogs:', error.response?.data || error);
    return { data: [] };
  }
};

export const fetchBlogsPage = async () => {
  try {
    const response = await api.get('/blogs-page', {
      params: { populate: '*' },
    });
    console.log('✅ blog-main-page:', response);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error fetching blogs page:', error);
    return null;
  }
};

export const fetchGlobalData = async () => {
  try {
    const response = await api.get('/global', {
      params: {
        populate: '*',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching global data:', error);
    return null;
  }
};
