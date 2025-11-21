import axios from 'axios';
import { commonSwedishNames } from '../data/swedishData.js';

// Service to fetch today's name day
export const getNameDay = async () => {
  try {
    // Try to fetch from the Swedish name day API
    // Note: This might have CORS issues in browser, so we'll have a fallback
    const response = await axios.get('https://api.dryg.net/dagar/v2.1/2024/01/01', {
      timeout: 5000
    });
    
    if (response.data && response.data.dagar && response.data.dagar[0]) {
      const dayData = response.data.dagar[0];
      return {
        names: dayData.namnsdag ? dayData.namnsdag.split(', ') : [],
        date: dayData.datum,
        source: 'api'
      };
    }
  } catch (error) {
    console.log('API not available, using fallback data');
  }
  
  // Fallback to mock data based on current date
  const today = new Date();
  const dayOfMonth = today.getDate();
  const names = commonSwedishNames[dayOfMonth] || ['Anna', 'Erik']; // Default names
  
  return {
    names: names,
    date: today.toISOString().split('T')[0],
    source: 'mock'
  };
};

// Alternative API endpoint (if the first one doesn't work)
export const getNameDayAlternative = async () => {
  try {
    // This uses a different approach - fetch today's date
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    // Try a different Swedish name day API
    const response = await axios.get(`https://sholiday.faboul.se/dagar/v2.1/${today.getFullYear()}/${month}/${day}`, {
      timeout: 5000
    });
    
    if (response.data && response.data.dagar && response.data.dagar[0]) {
      const dayData = response.data.dagar[0];
      return {
        names: dayData.namnsdag ? dayData.namnsdag.split(', ') : [],
        date: dayData.datum,
        source: 'alternative_api'
      };
    }
  } catch (error) {
    console.log('Alternative API not available');
  }
  
  return null;
};

// Get today's name day with multiple fallbacks
export const getTodaysNames = async () => {
  // Try primary API
  let result = await getNameDay();
  
  // If primary API failed, try alternative
  if (result.source === 'mock') {
    const altResult = await getNameDayAlternative();
    if (altResult) {
      result = altResult;
    }
  }
  
  // Ensure we always have at least some names
  if (!result.names || result.names.length === 0) {
    const today = new Date();
    const dayOfMonth = today.getDate();
    result.names = commonSwedishNames[dayOfMonth] || ['Anna', 'Erik'];
  }
  
  return result;
};
