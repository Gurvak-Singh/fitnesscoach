
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutGenerator from "@/components/fitness/WorkoutGenerator";
import WorkoutTracker from "@/components/WorkoutTracker";
import WorkoutHistory from "@/components/fitness/WorkoutHistory";
import ExerciseLibrary from "@/components/fitness/ExerciseLibrary";

const Fitness = () => {
  const [activeTab, setActiveTab] = useState("generator");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Fitness Module</h1>
        
        <Tabs defaultValue="generator" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="generator">Workout Generator</TabsTrigger>
            <TabsTrigger value="tracker">Workout Tracker</TabsTrigger>
            <TabsTrigger value="history">Progress History</TabsTrigger>
            <TabsTrigger value="library">Exercise Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator">
            <WorkoutGenerator />
          </TabsContent>
          
          <TabsContent value="tracker">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WorkoutTracker className="md:col-span-2" />
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <WorkoutHistory />
          </TabsContent>
          
          <TabsContent value="library">
            <ExerciseLibrary />
          </TabsContent>
        </Tabs>
        
        {/* Footer content */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>FitLife Coach — Your personalized fitness journey</p>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
