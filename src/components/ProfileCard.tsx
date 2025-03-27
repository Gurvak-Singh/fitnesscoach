import React, { useEffect, useState, useContext } from "react";
import { Trophy, TrendingUp, Activity, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "@/App";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardCustomizer from "./DashboardCustomizer";

interface ProfileCardProps {
  className?: string;
}

interface ProfileData {
  name: string;
  fitness_goal: string;
  streak: number;
  progress: number;
  dashboard_preferences?: string[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
  const { session } = useContext(AuthContext);
  const isMobile = useIsMobile();
  const [profile, setProfile] = useState<ProfileData>({
    name: "User",
    fitness_goal: "Weight Loss",
    streak: 0,
    progress: 0,
    dashboard_preferences: ["streak", "progress", "activity"]
  });
  const [loading, setLoading] = useState(true);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  useEffect(() => {
    async function getProfile() {
      if (!session?.user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name, fitness_goal, dashboard_preferences')
          .eq('id', session.user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          // Calculate mock data for streak and progress
          // In a real app, these would come from actual tracking data
          const streak = Math.floor(Math.random() * 10) + 1; // 1-10 day streak
          const progress = Math.floor(Math.random() * 50) + 10; // 10-60% progress
          
          setProfile({
            name: data.name || "User",
            fitness_goal: data.fitness_goal || "Weight Loss",
            streak,
            progress,
            dashboard_preferences: data.dashboard_preferences || ["streak", "progress", "activity"]
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [session]);

  const savePreferences = async (preferences: string[]) => {
    if (!session?.user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          dashboard_preferences: preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);
        
      if (error) throw error;
      
      setProfile(prev => ({
        ...prev,
        dashboard_preferences: preferences
      }));
      
      setCustomizeOpen(false);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  if (loading) {
    return (
      <div className={cn("glass-card rounded-2xl p-6 animate-pulse", className)}>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/30 mb-4"></div>
          <div className="h-6 w-32 bg-primary/30 rounded mb-2"></div>
          <div className="h-4 w-48 bg-primary/20 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("glass-card rounded-2xl overflow-hidden animate-fade-in", className)}>
      <div className="relative p-6">
        <div className="absolute top-0 right-0 left-0 h-20 bg-gradient-to-r from-primary/30 to-primary/10 -mx-6 -mt-6"></div>
        
        <div className="relative flex flex-col items-center pt-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-0 right-0" 
            onClick={() => setCustomizeOpen(true)}
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Customize Dashboard</span>
          </Button>
          
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-semibold shadow-lg border-4 border-white dark:border-slate-900">
            {profile.name.charAt(0)}
          </div>
          
          <h2 className="mt-3 text-xl font-semibold">Welcome back, {profile.name}</h2>
          <p className="text-muted-foreground mt-1">Current goal: {profile.fitness_goal}</p>
          
          {profile.dashboard_preferences?.includes("streak") || profile.dashboard_preferences?.includes("progress") ? (
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4 w-full mt-6`}>
              {profile.dashboard_preferences?.includes("streak") && (
                <div className="flex flex-col items-center p-3 rounded-xl bg-secondary/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{profile.streak} day streak</span>
                </div>
              )}
              
              {profile.dashboard_preferences?.includes("progress") && (
                <div className="flex flex-col items-center p-3 rounded-xl bg-secondary/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{profile.progress}% to goal</span>
                </div>
              )}
            </div>
          ) : null}
          
          {profile.dashboard_preferences?.includes("activity") && (
            <div className="w-full mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Today's Activity</span>
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <DashboardCustomizer 
        open={customizeOpen} 
        onClose={() => setCustomizeOpen(false)}
        preferences={profile.dashboard_preferences || []}
        onSave={savePreferences}
      />
    </div>
  );
};

export default ProfileCard;
