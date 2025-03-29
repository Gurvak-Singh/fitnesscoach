
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutGenerator from "@/components/fitness/WorkoutGenerator";
import WorkoutTracker from "@/components/WorkoutTracker";
import WorkoutHistory from "@/components/fitness/WorkoutHistory";
import ExerciseLibrary from "@/components/fitness/ExerciseLibrary";
import { useIsMobile } from "@/hooks/use-mobile";

const Fitness = () => {
  const [activeTab, setActiveTab] = useState("generator");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="container mx-auto pt-20 md:pt-24 pb-16 px-3 md:px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Fitness Module</h1>
        
        <Tabs defaultValue="generator" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`${isMobile ? 'flex flex-wrap gap-2' : 'grid grid-cols-4'} mb-6 md:mb-8`}>
            <TabsTrigger value="generator" className={isMobile ? 'w-[calc(50%-4px)]' : ''}>
              {isMobile ? 'Generator' : 'Workout Generator'}
            </TabsTrigger>
            <TabsTrigger value="tracker" className={isMobile ? 'w-[calc(50%-4px)]' : ''}>
              {isMobile ? 'Tracker' : 'Workout Tracker'}
            </TabsTrigger>
            <TabsTrigger value="history" className={isMobile ? 'w-[calc(50%-4px)]' : ''}>
              {isMobile ? 'History' : 'Progress History'}
            </TabsTrigger>
            <TabsTrigger value="library" className={isMobile ? 'w-[calc(50%-4px)]' : ''}>
              {isMobile ? 'Exercises' : 'Exercise Library'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="pt-1 md:pt-2">
            <WorkoutGenerator />
          </TabsContent>
          
          <TabsContent value="tracker" className="pt-1 md:pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WorkoutTracker className="md:col-span-2" />
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="pt-1 md:pt-2">
            <WorkoutHistory />
          </TabsContent>
          
          <TabsContent value="library" className="pt-1 md:pt-2">
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
