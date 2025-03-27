
import React from "react";
import { Trophy, TrendingUp, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
  // Mock data - in a real app, this would come from user state
  const user = {
    name: "Alex",
    goal: "Weight Loss",
    streak: 7,
    progress: 32,
  };

  return (
    <div className={cn("glass-card rounded-2xl overflow-hidden animate-fade-in", className)}>
      <div className="relative p-6">
        <div className="absolute top-0 right-0 left-0 h-20 bg-gradient-to-r from-primary/30 to-primary/10 -mx-6 -mt-6"></div>
        
        <div className="relative flex flex-col items-center pt-10">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-semibold shadow-lg border-4 border-white dark:border-slate-900">
            {user.name.charAt(0)}
          </div>
          
          <h2 className="mt-3 text-xl font-semibold">Welcome back, {user.name}</h2>
          <p className="text-muted-foreground mt-1">Current goal: {user.goal}</p>
          
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            <div className="flex flex-col items-center p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{user.streak} day streak</span>
            </div>
            
            <div className="flex flex-col items-center p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{user.progress}% to goal</span>
            </div>
          </div>
          
          <div className="w-full mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Today's Activity</span>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
