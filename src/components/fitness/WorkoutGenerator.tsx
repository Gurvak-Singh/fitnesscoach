
import React, { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dumbbell, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const WorkoutGenerator: React.FC = () => {
  const [goal, setGoal] = useState("strength");
  const [location, setLocation] = useState("gym");
  const [equipment, setEquipment] = useState("full");
  const [duration, setDuration] = useState([30]);
  const [fitnessLevel, setFitnessLevel] = useState("intermediate");
  const [includeDynamicAdjustments, setIncludeDynamicAdjustments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGenerateWorkout = () => {
    setIsLoading(true);
    
    // Simulate API call to generate workout
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Workout plan generated successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Dumbbell className="mr-2 h-5 w-5 text-primary" />
            Adaptive Workout Generator
          </CardTitle>
          <CardDescription>
            Create personalized workout routines based on your goals, equipment, and fitness level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Select your fitness goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strength">Strength & Muscle Building</SelectItem>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="endurance">Endurance & Stamina</SelectItem>
                    <SelectItem value="flexibility">Flexibility & Mobility</SelectItem>
                    <SelectItem value="maintenance">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">Workout Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select workout location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gym">Gym</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="travel">Travel/Hotel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="equipment">Available Equipment</Label>
                <Select value={equipment} onValueChange={setEquipment}>
                  <SelectTrigger id="equipment">
                    <SelectValue placeholder="Select available equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Gym Equipment</SelectItem>
                    <SelectItem value="limited">Limited Equipment</SelectItem>
                    <SelectItem value="dumbbells">Dumbbells Only</SelectItem>
                    <SelectItem value="bodyweight">Bodyweight Only</SelectItem>
                    <SelectItem value="bands">Resistance Bands</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fitness-level">Fitness Level</Label>
                <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                  <SelectTrigger id="fitness-level">
                    <SelectValue placeholder="Select your fitness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="athlete">Athlete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="duration">Workout Duration (minutes)</Label>
                  <span className="text-sm font-medium">{duration[0]} min</span>
                </div>
                <Slider
                  id="duration"
                  min={15}
                  max={90}
                  step={5}
                  value={duration}
                  onValueChange={setDuration}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2 pt-4">
                <div className="space-y-0.5">
                  <Label htmlFor="dynamic-adjustments">Dynamic Adjustments</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically adjust workout intensity based on your progress
                  </p>
                </div>
                <Switch
                  id="dynamic-adjustments"
                  checked={includeDynamicAdjustments}
                  onCheckedChange={setIncludeDynamicAdjustments}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center p-4 rounded-md bg-primary/10">
            <AlertCircle className="h-5 w-5 text-primary mr-2" />
            <div className="text-sm">
              <p className="font-medium">Workouts are adaptive</p>
              <p className="text-muted-foreground">Your routine will automatically adjust as you progress and will adapt to your performance.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">Estimated completion time: {duration[0]} minutes</span>
          </div>
          <Button onClick={handleGenerateWorkout} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Workout"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Strength Circuit</CardTitle>
            <CardDescription>Full body, 30 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Barbell Squats</span>
                <span className="text-muted-foreground">3 × 10</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Push-ups</span>
                <span className="text-muted-foreground">3 × 15</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Dumbbell Rows</span>
                <span className="text-muted-foreground">3 × 12</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Shoulder Press</span>
                <span className="text-muted-foreground">3 × 10</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Plank</span>
                <span className="text-muted-foreground">3 × 45s</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">HIIT Cardio</CardTitle>
            <CardDescription>Fat burning, 25 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Jumping Jacks</span>
                <span className="text-muted-foreground">45s × 3</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Mountain Climbers</span>
                <span className="text-muted-foreground">45s × 3</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Burpees</span>
                <span className="text-muted-foreground">30s × 3</span>
              </li>
              <li className="flex items-center justify-between">
                <span>High Knees</span>
                <span className="text-muted-foreground">45s × 3</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Jump Squats</span>
                <span className="text-muted-foreground">30s × 3</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Core Fitness</CardTitle>
            <CardDescription>Abdominal focus, 20 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Crunches</span>
                <span className="text-muted-foreground">3 × 20</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Russian Twists</span>
                <span className="text-muted-foreground">3 × 15</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Leg Raises</span>
                <span className="text-muted-foreground">3 × 12</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Bicycle Crunches</span>
                <span className="text-muted-foreground">3 × 15</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Plank Variations</span>
                <span className="text-muted-foreground">3 × 45s</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default WorkoutGenerator;
