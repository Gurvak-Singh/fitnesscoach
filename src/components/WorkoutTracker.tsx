
import React, { useState } from "react";
import { Dumbbell, Plus, Calendar, Activity, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface WorkoutTrackerProps {
  className?: string;
}

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ className }) => {
  const [isTracking, setIsTracking] = useState(false);
  
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

  // Active workout state (when tracking)
  const [activeWorkout, setActiveWorkout] = useState({
    name: "Lower Body Strength",
    startTime: new Date(),
    exercises: [
      { name: "Barbell Squat", sets: 3, reps: 10, weight: 135, completed: 2 },
      { name: "Romanian Deadlift", sets: 3, reps: 12, weight: 95, completed: 1 },
      { name: "Walking Lunges", sets: 3, reps: 10, weight: 30, completed: 0 },
      { name: "Leg Press", sets: 3, reps: 12, weight: 180, completed: 0 },
      { name: "Calf Raises", sets: 3, reps: 15, weight: 120, completed: 0 },
    ]
  });

  const handleStartWorkout = () => {
    setIsTracking(true);
  };

  const handleStopWorkout = () => {
    setIsTracking(false);
  };

  const handleCompleteSet = (exerciseIndex: number) => {
    const updatedExercises = [...activeWorkout.exercises];
    if (updatedExercises[exerciseIndex].completed < updatedExercises[exerciseIndex].sets) {
      updatedExercises[exerciseIndex].completed += 1;
      setActiveWorkout({ ...activeWorkout, exercises: updatedExercises });
    }
  };

  return (
    <div className={cn("glass-card rounded-2xl p-6 animate-fade-in", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Dumbbell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Workout Plan</h2>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button 
              className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label="Add workout"
            >
              <Plus className="w-4 h-4" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Workout</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="workout-name">Workout Name</Label>
                <Input id="workout-name" placeholder="e.g., Upper Body Strength" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="workout-date">Date</Label>
                  <Input id="workout-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="workout-time">Time</Label>
                  <Input id="workout-time" type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="workout-duration">Duration (minutes)</Label>
                <Input id="workout-duration" type="number" min="5" max="180" placeholder="45" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Workout</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isTracking ? (
        <div className="space-y-4">
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold">{activeWorkout.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Activity className="w-3 h-3 mr-1" />
                  <span>In progress</span>
                  <span className="mx-2">•</span>
                  <span>Started at {activeWorkout.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
              <Badge variant="outline" className="flex items-center">
                <span className="animate-pulse mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
                Live Tracking
              </Badge>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">Workout Progress</span>
                <span>
                  {activeWorkout.exercises.reduce((acc, ex) => acc + ex.completed, 0)}/
                  {activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets, 0)} sets
                </span>
              </div>
              <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(activeWorkout.exercises.reduce((acc, ex) => acc + ex.completed, 0) / 
                    activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets, 0)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            {activeWorkout.exercises.map((exercise, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-3 rounded-lg border transition-colors",
                  exercise.completed === exercise.sets 
                    ? "bg-primary/5 border-primary/20" 
                    : "bg-card/50 border-border"
                )}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{exercise.name}</h4>
                  <div className="text-xs font-medium text-muted-foreground">
                    {exercise.completed}/{exercise.sets} sets
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight} lbs
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-1">
                    {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                      <div 
                        key={setIndex} 
                        className={cn(
                          "h-1.5 w-6 rounded-full",
                          setIndex < exercise.completed ? "bg-primary" : "bg-secondary" 
                        )}
                      ></div>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    variant={exercise.completed === exercise.sets ? "outline" : "default"}
                    disabled={exercise.completed === exercise.sets}
                    onClick={() => handleCompleteSet(index)}
                  >
                    {exercise.completed === exercise.sets ? "Completed" : "Complete Set"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline">Add Exercise</Button>
            <Button variant="destructive" onClick={handleStopWorkout}>End Workout</Button>
          </div>
        </div>
      ) : (
        <>
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
                    <Button size="sm" onClick={handleStartWorkout}>
                      Start
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button 
              className="w-full py-3 rounded-xl border border-primary/20 text-primary font-medium hover:bg-primary/5 transition-colors flex items-center justify-center"
              variant="outline"
            >
              <Calendar className="w-4 h-4 mr-2" />
              View full schedule
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkoutTracker;
