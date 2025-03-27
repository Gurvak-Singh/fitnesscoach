
import React from "react";
import { Dumbbell, Plus, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkoutTrackerProps {
  className?: string;
}

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ className }) => {
  // Mock data - in a real app, this would be fetched from a database
  const recentWorkouts = [
    {
      name: "Upper Body",
      date: "Today",
      duration: "45 min",
      calories: 320,
      completed: true,
    },
    {
      name: "Cardio",
      date: "Tomorrow",
      duration: "30 min",
      calories: 280,
      completed: false,
    },
  ];

  return (
    <div className={cn("glass-card rounded-2xl p-6 animate-fade-in", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Dumbbell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Workout Plan</h2>
        </div>
        <button 
          className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
          aria-label="Add workout"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {recentWorkouts.map((workout, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-xl hover-scale soft-shadow",
              workout.completed 
                ? "bg-secondary/40" 
                : "bg-primary/5 border border-primary/20"
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{workout.name}</h3>
                  {!workout.completed && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      Upcoming
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{workout.date}</span>
                  <span className="mx-2">•</span>
                  <span>{workout.duration}</span>
                </div>
              </div>
              {workout.completed ? (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Burned</p>
                  <p className="font-medium">{workout.calories} cal</p>
                </div>
              ) : (
                <button className="text-primary text-sm font-medium hover:bg-primary/10 px-3 py-1 rounded-full transition-colors">
                  Start
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full py-3 rounded-xl border border-primary/20 text-primary font-medium hover:bg-primary/5 transition-colors flex items-center justify-center">
          <Calendar className="w-4 h-4 mr-2" />
          View full schedule
        </button>
      </div>
    </div>
  );
};

export default WorkoutTracker;
