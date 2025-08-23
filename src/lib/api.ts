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
          technology: true,
          cta_buttons: true,
          Brand_Items: true,
          stats: true,
          Brand_logos: true,
          IndustryLeadersChoiceSection: {
            populate: ['features', 'choice_video'],
          },
          WhoWeAre: {
            populate: ['focus_areas'], // ✅ correct
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
        },
      },
    });

    const data = response.data.data;
    console.log('✅ Fetched homepage data:', data);

    // unwrap first item automatically
    if (Array.isArray(data.IndustryLeadersChoiceSection)) {
      data.IndustryLeadersChoiceSection = data.IndustryLeadersChoiceSection[0] || null;
    }

    return data;
  } catch (error) {
    console.error('❌ Error fetching homepage:', error.response?.data || error);
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
