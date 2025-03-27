
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileForm from "@/components/ProfileForm";
import { toast } from "sonner";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const Onboarding = () => {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  
  const handleComplete = () => {
    setIsComplete(true);
    toast.success("Profile completed! Redirecting to dashboard...");
    
    // Wait a bit before redirecting to show the success message
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto pt-8 pb-16 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          </div>
          <ThemeSwitcher variant="icon" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card/50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-2">Why this information matters</h2>
            <p className="text-sm text-muted-foreground">
              We need to understand your current body metrics, daily activities, and sleep patterns 
              to create personalized meal plans and workout routines. This information helps us 
              tailor recommendations that will help you achieve your fitness goals efficiently.
            </p>
          </div>
          
          {!isComplete ? (
            <ProfileForm 
              isOnboarding={true} 
              onComplete={handleComplete} 
            />
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Profile Completed!</h3>
              <p className="text-muted-foreground mb-4">
                Thank you for providing your information. We're preparing your personalized dashboard.
              </p>
              <div className="animate-pulse">Redirecting to dashboard...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
