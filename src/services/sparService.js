// SPAR (Statens Personadressregister) Service Analysis
// This service explains why SPAR cannot be used for name distribution mapping

export const sparLimitations = {
  dataAccess: {
    individual_lookup: {
      available: true,
      purpose: "Identity verification, address validation",
      providers: ["GrandID", "Signicat", "BankID services"],
      cost: "Per lookup (expensive for bulk)",
      authentication: "Strong authentication required"
    },
    bulk_statistics: {
      available: false,
      reason: "Privacy protection, GDPR compliance",
      alternative: "Contact Skatteverket for research partnerships"
    },
    name_distribution: {
      available: false,
      reason: "Not an authorized purpose under Swedish law",
      violation: "Would violate individual privacy rights"
    }
  },
  
  legal_restrictions: [
    "GDPR compliance requirements",
    "Purpose limitation - only for authorized uses",
    "Individual privacy protection",
    "No commercial use of bulk personal data",
    "Requires explicit consent for non-authorized purposes"
  ],
  
  authorized_purposes: [
    "Taxation",
    "Population registration", 
    "Crime prevention",
    "Identity verification",
    "Government administration"
  ],
  
  unauthorized_purposes: [
    "Statistical analysis for commercial apps",
    "Name popularity research",
    "Demographic mapping",
    "Marketing purposes",
    "General public information"
  ]
};

// Mock SPAR API structure (for educational purposes only)
export const mockSparAPI = {
  // This is what a SPAR API call would look like (if you had access)
  individualLookup: async (personnummer) => {
    // This would require:
    // 1. Valid Swedish personnummer (personal ID)
    // 2. Strong authentication (BankID, etc.)
    // 3. Authorized purpose
    // 4. Payment per lookup
    
    throw new Error(`
      SPAR Individual Lookup Not Available:
      - Requires valid Swedish personnummer
      - Needs strong authentication (BankID)
      - Must have authorized purpose
      - Costs per lookup
      - Cannot be used for bulk name statistics
    `);
  },
  
  bulkNameQuery: async (name) => {
    // This type of query is NOT POSSIBLE with SPAR
    throw new Error(`
      SPAR Bulk Name Queries Are Prohibited:
      - Violates Swedish privacy laws
      - Not an authorized use of SPAR data
      - Would require consent from every individual
      - GDPR compliance issues
      - Use historical SCB data instead
    `);
  },
  
  getNameDistribution: async (names, regions) => {
    // This is exactly what we want but CANNOT get from SPAR
    throw new Error(`
      SPAR Name Distribution Queries Are Illegal:
      - Personal data protection laws prohibit this
      - No aggregate statistics available
      - Individual privacy must be protected
      - Use enhanced historical estimates instead
    `);
  }
};

// Educational function showing why SPAR won't work
export const explainSparLimitations = () => {
  return {
    summary: "SPAR cannot provide name distribution data for mapping applications",
    
    reasons: {
      privacy: "Individual privacy protection is paramount in Swedish law",
      gdpr: "GDPR prohibits bulk processing of personal data without consent",
      purpose: "Name day mapping is not an authorized use of SPAR data",
      technical: "SPAR APIs only support individual lookups, not statistics"
    },
    
    what_spar_provides: [
      "Individual identity verification",
      "Address validation for specific persons",
      "Civil status information (with authorization)",
      "Family relationship data (restricted access)"
    ],
    
    what_spar_cannot_provide: [
      "Lists of people by name",
      "Name popularity statistics", 
      "Population distribution by name",
      "Aggregate demographic data",
      "Bulk statistical queries"
    ],
    
    legal_consequences: [
      "Violating SPAR regulations can result in fines",
      "GDPR violations carry severe penalties",
      "Unauthorized data processing is criminal in Sweden",
      "Individual privacy rights are strongly protected"
    ],
    
    better_alternatives: [
      "Historical SCB data (2021-2023)",
      "Enhanced statistical estimates",
      "Demographic modeling based on public data",
      "Research partnerships with universities"
    ]
  };
};

// Function to check if SPAR access would be theoretically possible
export const assessSparFeasibility = (useCase) => {
  const assessment = {
    useCase: useCase,
    feasible: false,
    reasons: [],
    recommendations: []
  };
  
  if (useCase.includes('name distribution') || useCase.includes('population mapping')) {
    assessment.reasons.push('Bulk personal data queries prohibited');
    assessment.reasons.push('Privacy laws prevent aggregate name statistics');
    assessment.recommendations.push('Use historical SCB data instead');
  }
  
  if (useCase.includes('commercial') || useCase.includes('app')) {
    assessment.reasons.push('Commercial use of SPAR data not authorized');
    assessment.recommendations.push('Focus on public statistical data sources');
  }
  
  if (useCase.includes('research') && useCase.includes('academic')) {
    assessment.feasible = true;
    assessment.reasons.push('Academic research may qualify for special access');
    assessment.recommendations.push('Apply for research partnership with Skatteverket');
    assessment.recommendations.push('Ensure proper ethical approval');
    assessment.recommendations.push('Plan for data anonymization requirements');
  }
  
  return assessment;
};

// Export the explanation for use in the UI
export default {
  limitations: sparLimitations,
  mockAPI: mockSparAPI,
  explain: explainSparLimitations,
  assess: assessSparFeasibility
};
