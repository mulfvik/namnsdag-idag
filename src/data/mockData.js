// This file has been deprecated and replaced with swedishData.js
// Mock data generation has been replaced with enhanced historical data
// Please use swedishData.js for municipality data and enhancedNameService.js for population distribution

console.warn('mockData.js is deprecated. Use swedishData.js and enhancedNameService.js instead');

// Re-export from the new location for backward compatibility (temporary)
export { swedishMunicipalities, commonSwedishNames } from './swedishData.js';
