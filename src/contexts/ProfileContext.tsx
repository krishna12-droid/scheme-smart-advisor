
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { UserProfile, Scheme } from "../types";
import { userProfiles, getRecommendedSchemes } from "../services/mockData";
import { toast } from "sonner";

interface ProfileContextType {
  profile: UserProfile | null;
  recommendedSchemes: Scheme[];
  loading: boolean;
  saveProfile: (profileData: Omit<UserProfile, "id" | "userId">) => void;
  hasProfile: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendedSchemes, setRecommendedSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      
      // Simulate fetching profile from API
      setTimeout(() => {
        const foundProfile = userProfiles.find(p => p.userId === currentUser.id);
        
        if (foundProfile) {
          setProfile(foundProfile);
          const schemes = getRecommendedSchemes(foundProfile);
          setRecommendedSchemes(schemes);
        } else {
          setProfile(null);
          setRecommendedSchemes([]);
        }
        
        setLoading(false);
      }, 500);
    } else {
      setProfile(null);
      setRecommendedSchemes([]);
      setLoading(false);
    }
  }, [currentUser]);

  const saveProfile = (profileData: Omit<UserProfile, "id" | "userId">) => {
    if (!currentUser) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const existingProfileIndex = userProfiles.findIndex(p => p.userId === currentUser.id);
      
      if (existingProfileIndex >= 0) {
        // Update existing profile
        const updatedProfile = {
          ...userProfiles[existingProfileIndex],
          ...profileData
        };
        
        userProfiles[existingProfileIndex] = updatedProfile;
        setProfile(updatedProfile);
        
        const schemes = getRecommendedSchemes(updatedProfile);
        setRecommendedSchemes(schemes);
        
        toast.success("Profile updated successfully");
      } else {
        // Create new profile
        const newProfile: UserProfile = {
          id: String(userProfiles.length + 1),
          userId: currentUser.id,
          ...profileData
        };
        
        userProfiles.push(newProfile);
        setProfile(newProfile);
        
        const schemes = getRecommendedSchemes(newProfile);
        setRecommendedSchemes(schemes);
        
        toast.success("Profile created successfully");
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        recommendedSchemes,
        loading,
        saveProfile,
        hasProfile: !!profile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
