const API_KEY = 'yum-ngfeNG1iaq9Q2PJK'; // GLÖM INTE BYTA MED EGEN NYCKEL <<<<
const API_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu';

export const fetchMenuItems = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: { 'x-zocom': API_KEY },
      });
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      // 🔴 om APIns svar inte är en array, ska den returnera ett tomt array
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
      return []; // alltid undvik krashar med att den returnerar en 
      // array ändå att apin inte funkar
    }
  };