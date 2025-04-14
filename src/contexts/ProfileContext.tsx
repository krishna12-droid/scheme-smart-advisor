
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserProfile } from "@/types";

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  saveProfile: (profileData: Omit<UserProfile, "id" | "userId">) => Promise<void>;
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
              gender: data.gender,
              state: data.state,
              district: data.district,
              income: data.income,
              maritalStatus: data.marital_status,
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

  const saveProfile = async (profileData: Omit<UserProfile, "id" | "userId">) => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: currentUser.id,
          name: profileData.name,
          email: profileData.email,
          age: profileData.age,
          gender: profileData.gender,
          state: profileData.state,
          district: profileData.district,
          income: profileData.income,
          marital_status: profileData.maritalStatus,
          occupation: profileData.occupation,
          education: profileData.education,
          health_conditions: profileData.healthConditions,
          dependents: profileData.dependents,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Update local state
      setProfile({ id: currentUser.id, userId: currentUser.id, ...profileData });
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
