
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import BMICalculator from "@/components/BMICalculator";
import MealPlan from "@/components/MealPlan";
import WorkoutTracker from "@/components/WorkoutTracker";
import ProgressGraph from "@/components/ProgressGraph";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Dumbbell, Users } from "lucide-react";

const Index = () => {
  // Apply staggered animation effect on page load
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First row */}
          <ProfileCard className="md:col-span-2" />
          
          {/* Second row */}
          <BMICalculator />
          <ProgressGraph />
          
          {/* Third row */}
          <div className="glass-card rounded-2xl p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <UtensilsCrossed className="w-5 h-5 mr-2 text-primary" />
                Meal Planning
              </h2>
              <Link to="/meals">
                <Button size="sm">
                  View Details
                </Button>
              </Link>
            </div>
            <MealPlan />
          </div>
          
          <div className="glass-card rounded-2xl p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Dumbbell className="w-5 h-5 mr-2 text-primary" />
                Fitness Tracking
              </h2>
              <Link to="/fitness">
                <Button size="sm">
                  View Details
                </Button>
              </Link>
            </div>
            <WorkoutTracker />
          </div>
          
          {/* Fourth row - Community */}
          <div className="glass-card rounded-2xl p-6 animate-fade-in md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Community & Integration
              </h2>
              <Link to="/community">
                <Button size="sm">
                  View Details
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-1">Wearable Sync</h3>
                <p className="text-sm text-muted-foreground">Connect your fitness devices to track your progress automatically.</p>
              </div>
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-1">Social Feed</h3>
                <p className="text-sm text-muted-foreground">Share your achievements and join community challenges.</p>
              </div>
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-1">Expert Access</h3>
                <p className="text-sm text-muted-foreground">Book consultations with nutritionists and trainers.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer content */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>FitMeal Tracker — Your personalized fitness journey</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
