# SPAR (Statens Personadressregister) - Data Source Analysis

## 🏛️ What is SPAR?

**SPAR (Statens personadressregister)** is Sweden's national personal address register that contains information about all persons registered as residents in Sweden. It's managed by the Swedish Tax Agency (Skatteverket) and updated daily with data from the Swedish Population Register.

## 📊 Data Available in SPAR

### Core Data Fields
- **Personal Identity Numbers** (personnummer)
- **Names** (first names, surnames)
- **Current addresses** (street, postal code, municipality)
- **Registration dates**
- **Civil status information**
- **Family relationships**

### Geographic Coverage
- **Complete coverage** of all Swedish residents
- **Real-time updates** (daily synchronization)
- **Historical address data** (limited retention)
- **Municipality-level precision**

## 🔐 Access Restrictions & Privacy

### Legal Framework
- Regulated by **Act (1998:527)** on SPAR
- **GDPR compliance** requirements
- **Strict privacy protections** for personal data
- **Purpose limitation** - data can only be used for specific authorized purposes

### Access Types

#### 1. **Individual Lookups** (Available)
- ✅ Identity verification services
- ✅ Address validation
- ✅ Single person queries
- **Use case**: Verify specific individuals
- **Providers**: GrandID, Signicat, other identity services

#### 2. **Bulk Statistical Data** (Restricted)
- ❌ **Not available for general public**
- ❌ **No aggregate name statistics**
- ❌ **No population distribution data**
- **Reason**: Privacy protection, GDPR compliance

#### 3. **Research Access** (Very Limited)
- 🔒 Requires **ethical approval**
- 🔒 Must demonstrate **legitimate research purpose**
- 🔒 **Anonymization requirements**
- 🔒 **Institutional backing** needed

## 🚫 Why SPAR Won't Work for Your Name Day Map

### Privacy Barriers
1. **Individual Privacy**: SPAR protects personal data - you cannot get lists of people by name
2. **Bulk Access Denied**: No way to get aggregate statistics about name distribution
3. **Purpose Limitation**: Your use case (name day mapping) is not an authorized purpose
4. **GDPR Compliance**: Bulk name statistics would violate privacy regulations

### Technical Barriers
1. **No Public API**: SPAR doesn't provide public APIs for statistical queries
2. **Commercial APIs Limited**: Services like GrandID/Signicat only do individual lookups
3. **Authentication Required**: All access requires strong authentication and authorization
4. **Cost Prohibitive**: Individual lookups are expensive and not suitable for bulk analysis

### Legal Barriers
1. **Authorized Users Only**: Only government agencies and authorized entities can access bulk data
2. **Specific Purposes**: Data can only be used for taxation, population registration, crime prevention, etc.
3. **No Commercial Use**: Cannot use SPAR data for general commercial applications
4. **Consent Requirements**: Would need explicit consent from every individual

## 🔍 What SPAR APIs Actually Provide

### Commercial Identity Services
```javascript
// Example: GrandID SPAR API (individual lookup only)
const sparLookup = {
  endpoint: "https://api.grandid.com/spar/v2/",
  purpose: "identity_verification",
  input: "personnummer", // Swedish personal ID
  output: {
    name: "John Doe",
    address: "Storgatan 1, 123 45 Stockholm",
    municipality: "Stockholm"
  },
  limitations: [
    "One person at a time",
    "Requires valid personnummer",
    "Authentication required",
    "Cost per lookup",
    "No bulk queries"
  ]
};
```

### What You CANNOT Get
- ❌ List of all people named "Anna" 
- ❌ Count of people with specific names by municipality
- ❌ Name popularity statistics
- ❌ Demographic breakdowns by name
- ❌ Historical name trends
- ❌ Any bulk statistical data

## 💡 Alternative Approaches

### 1. **Continue with Enhanced Historical Data** (Recommended)
Your current implementation using historical SCB patterns is actually **more appropriate** and **legally compliant** than trying to access SPAR data.

### 2. **Contact Skatteverket for Research Partnership**
If you have a legitimate research purpose:
- Apply for research access
- Demonstrate academic/scientific value
- Provide institutional backing
- Accept strict anonymization requirements

### 3. **Use SPAR for Address Validation Only**
If you had specific addresses, you could use SPAR APIs to:
- Validate addresses exist
- Get municipality information
- Verify postal codes

## 🎯 Recommendation for Your Project

**Do NOT pursue SPAR as a data source** for the following reasons:

### Why SPAR is Not Suitable
1. **Privacy Violations**: Getting name distribution data would violate Swedish privacy laws
2. **No Statistical APIs**: SPAR doesn't provide the aggregate data you need
3. **Legal Restrictions**: Your use case is not an authorized purpose under Swedish law
4. **Technical Impossibility**: The APIs don't support bulk statistical queries
5. **Cost Prohibitive**: Individual lookups would cost thousands of SEK for minimal data

### Better Approach
Your current **enhanced historical data** approach is:
- ✅ **Legally compliant**
- ✅ **Privacy-respecting** 
- ✅ **Technically feasible**
- ✅ **Cost-effective**
- ✅ **Reasonably accurate** (based on 2021-2023 SCB data)

## 📋 Summary

**SPAR is designed for individual identity verification, not statistical analysis.** It's heavily protected by privacy laws and cannot provide the aggregate name distribution data needed for your mapping application.

Your current approach using enhanced historical SCB data is not only more practical but also more appropriate from legal and ethical perspectives.

### Key Takeaway
**SPAR protects individual privacy - it cannot and should not be used for population-level name statistics.**

---

*Analysis Date: November 2024*
*Status: SPAR not suitable for statistical name mapping applications*
