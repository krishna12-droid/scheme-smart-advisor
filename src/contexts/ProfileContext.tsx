
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserProfile } from "@/types";

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  saveProfile: (profileData: Partial<UserProfile>) => Promise<void>;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", currentUser.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
            return;
          }

          if (data) {
            setProfile({
              id: data.id,
              userId: data.id,
              name: data.name,
              email: data.email,
              age: data.age,
              gender: data.gender as "male" | "female" | "other",
              state: data.state,
              district: data.district,
              income: data.income,
              maritalStatus: data.marital_status as "single" | "married" | "divorced" | "widowed",
              occupation: data.occupation,
              education: data.education,
              healthConditions: data.health_conditions || [],
              dependents: data.dependents
            });
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [currentUser]);

  const saveProfile = async (profileData: Partial<UserProfile>) => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: currentUser.id,
          name: profileData.name || profile?.name,
          email: profileData.email || profile?.email,
          age: profileData.age || profile?.age,
          gender: profileData.gender || profile?.gender,
          state: profileData.state || profile?.state,
          district: profileData.district || profile?.district,
          income: profileData.income || profile?.income,
          marital_status: profileData.maritalStatus || profile?.maritalStatus,
          occupation: profileData.occupation || profile?.occupation,
          education: profileData.education || profile?.education,
          health_conditions: profileData.healthConditions || profile?.healthConditions,
          dependents: profileData.dependents || profile?.dependents,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Update local state
      setProfile({
        ...profile,
        ...profileData,
        id: currentUser.id,
        userId: currentUser.id
      } as UserProfile);
      
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        saveProfile,
        hasProfile: !!profile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
