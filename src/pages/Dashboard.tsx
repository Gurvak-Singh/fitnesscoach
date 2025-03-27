
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import BMICalculator from "@/components/BMICalculator";
import MealPlan from "@/components/MealPlan";
import WorkoutTracker from "@/components/WorkoutTracker";
import ProgressGraph from "@/components/ProgressGraph";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Dumbbell } from "lucide-react";

const Dashboard = () => {
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
        </div>
        
        {/* Footer content */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>FitLife Coach — Your personalized fitness journey</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
