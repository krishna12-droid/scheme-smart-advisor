
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface UserProfile {
  id: string;
  userId: string;
  name?: string;
  email?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  state?: string;
  district?: string;
  income?: number;
  maritalStatus?: "single" | "married" | "divorced" | "widowed";
  occupation?: string;
  education?: string;
  healthConditions?: string[];
  dependents?: number;
}

export interface Scheme {
  id: string;
  name: string;
  provider: string;
  type: string;
  description: string;
  eligibility_criteria: Record<string, any>;
  benefits: string[];
  application_link: string;
  coverage_amount?: string;
  premium?: string;
  documents?: string[];
}

export interface SavedScheme {
  id: string;
  user_id: string;
  scheme_id: string;
  scheme?: Scheme;
}
