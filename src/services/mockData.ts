
import { User, UserProfile, Scheme } from "../types";

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    isAdmin: true,
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    isAdmin: false,
  },
];

// Mock User Profiles
export const userProfiles: UserProfile[] = [
  {
    id: "1",
    userId: "2",
    age: 35,
    gender: "male",
    state: "Maharashtra",
    district: "Mumbai",
    income: 500000,
    maritalStatus: "married",
    occupation: "Private Sector",
    education: "Graduate",
    healthConditions: [],
    dependents: 2,
  },
];

// Mock LIC Insurance Schemes
export const licSchemes: Scheme[] = [
  {
    id: "lic1",
    name: "LIC Jeevan Anand",
    provider: "LIC",
    type: "Endowment Plan",
    description: "A combination of protection and savings with profits. It provides financial protection against death throughout the lifetime of the policyholder with the provision of payment of lumpsum at the end of the policy term.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
    },
    benefits: [
      "Life cover throughout lifetime",
      "Periodic bonuses",
      "Tax benefits under Section 80C"
    ],
    applicationLink: "https://licindia.in/Products/Insurance-Plan/jeevan-anand",
    coverageAmount: "₹5 Lakhs to ₹50 Lakhs",
    premium: "Starting from ₹2,500 per month"
  },
  {
    id: "lic2",
    name: "LIC Term Insurance Plan",
    provider: "LIC",
    type: "Term Plan",
    description: "Pure protection plan providing financial protection to the insured's family in case of unfortunate death of the insured during the policy term.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
    },
    benefits: [
      "High coverage at affordable premium",
      "Optional riders available",
      "Tax benefits under Section 80C"
    ],
    applicationLink: "https://licindia.in/Products/Insurance-Plan/term-plans",
    coverageAmount: "₹25 Lakhs to ₹1 Crore",
    premium: "Starting from ₹1,500 per month"
  },
  {
    id: "lic3",
    name: "LIC Children's Money Back Plan",
    provider: "LIC",
    type: "Children's Plan",
    description: "Provides financial support for children's education and other needs through periodic payments.",
    eligibilityCriteria: {
      minAge: 20,
      maxAge: 45,
      maritalStatus: ["married"],
    },
    benefits: [
      "Survival benefits at specified intervals",
      "Education funding",
      "Marriage funding"
    ],
    applicationLink: "https://licindia.in/Products/Insurance-Plan/child-plans",
    coverageAmount: "₹2 Lakhs to ₹20 Lakhs",
    premium: "Starting from ₹3,000 per month"
  },
  {
    id: "lic4",
    name: "LIC Retirement Plan",
    provider: "LIC",
    type: "Pension Plan",
    description: "Provides regular income after retirement to maintain standard of living.",
    eligibilityCriteria: {
      minAge: 30,
      maxAge: 58,
    },
    benefits: [
      "Regular pension post retirement",
      "Return of premium option",
      "Tax benefits under Section 80CCC"
    ],
    applicationLink: "https://licindia.in/Products/Pension-Plans",
    coverageAmount: "Based on premium paid",
    premium: "Starting from ₹5,000 per month"
  }
];

// Mock Star Health Insurance Schemes
export const starHealthSchemes: Scheme[] = [
  {
    id: "star1",
    name: "Star Comprehensive Insurance Policy",
    provider: "Star Health",
    type: "Health Insurance",
    description: "Comprehensive health insurance coverage for individuals and families with wide-ranging benefits.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
    },
    benefits: [
      "Hospitalization coverage",
      "Pre and post hospitalization expenses",
      "Day care procedures",
      "No medical check-up up to age 50"
    ],
    applicationLink: "https://www.starhealth.in/health-insurance/comprehensive-insurance",
    coverageAmount: "₹1 Lakh to ₹25 Lakhs",
    premium: "Starting from ₹1,000 per month"
  },
  {
    id: "star2",
    name: "Star Senior Citizen Health Insurance",
    provider: "Star Health",
    type: "Health Insurance",
    description: "Special health insurance plan designed for senior citizens with benefits tailored to their needs.",
    eligibilityCriteria: {
      minAge: 60,
      maxAge: 75,
    },
    benefits: [
      "Coverage for pre-existing illnesses after waiting period",
      "Domiciliary treatment coverage",
      "Automatic restoration of basic sum insured"
    ],
    applicationLink: "https://www.starhealth.in/health-insurance/senior-citizen-insurance",
    coverageAmount: "₹1 Lakh to ₹10 Lakhs",
    premium: "Starting from ₹1,500 per month"
  },
  {
    id: "star3",
    name: "Star Family Health Optima",
    provider: "Star Health",
    type: "Health Insurance",
    description: "Family floater health insurance plan covering all family members under a single sum insured.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      maritalStatus: ["married"],
    },
    benefits: [
      "Coverage for entire family under single sum insured",
      "Automatic restoration of sum insured",
      "Maternity benefit (optional)",
      "Recharge of sum insured"
    ],
    applicationLink: "https://www.starhealth.in/health-insurance/family-health-optima",
    coverageAmount: "₹2 Lakhs to ₹50 Lakhs",
    premium: "Starting from ₹1,800 per month"
  },
  {
    id: "star4",
    name: "Star Special Care",
    provider: "Star Health",
    type: "Health Insurance",
    description: "Health insurance plan for people with diabetes and hypertension.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      healthConditions: {
        include: ["Diabetes", "Hypertension"],
      },
    },
    benefits: [
      "Coverage for diabetes and hypertension from day one",
      "Wellness and health check-up benefits",
      "Outpatient consultation coverage"
    ],
    applicationLink: "https://www.starhealth.in/health-insurance/diabetes-safe",
    coverageAmount: "₹3 Lakhs to ₹15 Lakhs",
    premium: "Starting from ₹2,000 per month"
  }
];

// Mock Government Schemes
export const governmentSchemes: Scheme[] = [
  {
    id: "gov1",
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    provider: "Government",
    type: "Life Insurance",
    description: "Government-backed life insurance scheme aimed at increasing the penetration of life insurance coverage in India.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 50,
      maxIncome: 1000000,
    },
    benefits: [
      "Life insurance coverage of ₹2 lakhs",
      "Affordable premium of ₹330 per annum",
      "Simple enrollment process through bank"
    ],
    applicationLink: "https://financialservices.gov.in/insurance-divisions/Government-Sponsored-Socially-Oriented-Insurance-Schemes/Pradhan-Mantri-Jeevan-Jyoti-Bima-Yojana(PMJJBY)",
    coverageAmount: "₹2 Lakhs",
    premium: "₹330 per year"
  },
  {
    id: "gov2",
    name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    provider: "Government",
    type: "Accident Insurance",
    description: "Government-backed accident insurance scheme offering coverage for death or disability due to accidents.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      maxIncome: 1000000,
    },
    benefits: [
      "Accidental death coverage of ₹2 lakhs",
      "Partial disability coverage of ₹1 lakh",
      "Annual premium of just ₹12"
    ],
    applicationLink: "https://financialservices.gov.in/insurance-divisions/Government-Sponsored-Socially-Oriented-Insurance-Schemes/Pradhan-Mantri-Suraksha-Bima-Yojana(PMSBY)",
    coverageAmount: "₹2 Lakhs",
    premium: "₹12 per year"
  },
  {
    id: "gov3",
    name: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)",
    provider: "Government",
    type: "Health Insurance",
    description: "Health insurance scheme providing coverage for secondary and tertiary care hospitalization to poor and vulnerable families.",
    eligibilityCriteria: {
      maxIncome: 250000,
    },
    benefits: [
      "Hospitalization coverage up to ₹5 lakhs per family per year",
      "Cashless treatment at empanelled hospitals",
      "No restriction on family size or age"
    ],
    applicationLink: "https://pmjay.gov.in/",
    coverageAmount: "₹5 Lakhs per family per year",
    premium: "Free for eligible families"
  },
  {
    id: "gov4",
    name: "Atal Pension Yojana (APY)",
    provider: "Government",
    type: "Pension Scheme",
    description: "Government-backed pension scheme primarily focused on workers in the unorganized sector.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 40,
      maxIncome: 500000,
    },
    benefits: [
      "Fixed pension of ₹1,000 to ₹5,000 per month after the age of 60",
      "Government co-contribution of 50% or ₹1,000 (whichever is lower)",
      "Tax benefits under Section 80CCD"
    ],
    applicationLink: "https://www.npscra.nsdl.co.in/scheme-details.php",
    premium: "Varies based on age and pension amount"
  },
  {
    id: "gov5",
    name: "National Scholarship Portal",
    provider: "Government",
    type: "Education Scholarship",
    description: "One-stop platform for various scholarship schemes for students.",
    eligibilityCriteria: {
      maxAge: 30,
      maxIncome: 600000,
      educationLevel: ["High School", "Graduate", "Post Graduate"],
    },
    benefits: [
      "Financial assistance for education",
      "Merit-based and means-based scholarships",
      "Support for minority communities"
    ],
    applicationLink: "https://scholarships.gov.in/",
    documents: ["Income Certificate", "Caste Certificate (if applicable)", "Academic Records"]
  }
];

export const allSchemes: Scheme[] = [...licSchemes, ...starHealthSchemes, ...governmentSchemes];

export function checkEligibility(profile: UserProfile, scheme: Scheme): boolean {
  const { eligibilityCriteria } = scheme;
  
  if (eligibilityCriteria.minAge !== undefined && profile.age < eligibilityCriteria.minAge) return false;
  if (eligibilityCriteria.maxAge !== undefined && profile.age > eligibilityCriteria.maxAge) return false;
  
  if (eligibilityCriteria.gender !== undefined && !eligibilityCriteria.gender.includes(profile.gender)) return false;
  
  if (eligibilityCriteria.states !== undefined && !eligibilityCriteria.states.includes(profile.state)) return false;
  
  if (eligibilityCriteria.minIncome !== undefined && profile.income < eligibilityCriteria.minIncome) return false;
  if (eligibilityCriteria.maxIncome !== undefined && profile.income > eligibilityCriteria.maxIncome) return false;
  
  if (eligibilityCriteria.maritalStatus !== undefined && !eligibilityCriteria.maritalStatus.includes(profile.maritalStatus)) return false;
  
  if (eligibilityCriteria.healthConditions?.include) {
    const includeConditions = eligibilityCriteria.healthConditions.include;
    // Must have at least one of the included conditions
    if (!profile.healthConditions.some(condition => includeConditions.includes(condition))) return false;
  }
  
  if (eligibilityCriteria.healthConditions?.exclude) {
    const excludeConditions = eligibilityCriteria.healthConditions.exclude;
    // Must not have any of the excluded conditions
    if (profile.healthConditions.some(condition => excludeConditions.includes(condition))) return false;
  }
  
  return true;
}

export function getRecommendedSchemes(profile: UserProfile): Scheme[] {
  return allSchemes.filter(scheme => checkEligibility(profile, scheme));
}
