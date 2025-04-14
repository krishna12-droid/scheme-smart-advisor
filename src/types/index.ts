
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface UserProfile {
  id: string;
  userId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  state: string;
  district: string;
  income: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  occupation: string;
  education: string;
  healthConditions: string[];
  dependents: number;
}

export interface Scheme {
  id: string;
  name: string;
  provider: 'LIC' | 'Star Health' | 'Government';
  type: string;
  description: string;
  eligibilityCriteria: {
    minAge?: number;
    maxAge?: number;
    gender?: ('male' | 'female' | 'other')[];
    states?: string[];
    minIncome?: number;
    maxIncome?: number;
    maritalStatus?: ('single' | 'married' | 'divorced' | 'widowed')[];
    occupation?: string[];
    educationLevel?: string[];
    healthConditions?: {
      include?: string[];
      exclude?: string[];
    };
  };
  benefits: string[];
  applicationLink: string;
  coverageAmount?: string;
  premium?: string;
  documents?: string[];
}
