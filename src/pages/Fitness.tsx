
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutGenerator from "@/components/fitness/WorkoutGenerator";
import WorkoutTracker from "@/components/WorkoutTracker";
import WorkoutHistory from "@/components/fitness/WorkoutHistory";
import ExerciseLibrary from "@/components/fitness/ExerciseLibrary";
import { useTabLayoutClasses } from "@/hooks/use-mobile";

const Fitness = () => {
  const [activeTab, setActiveTab] = useState("generator");
  const { tabsListClass, tabTriggerClass } = useTabLayoutClasses();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="container mx-auto pt-20 md:pt-24 pb-16 px-3 md:px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Fitness Module</h1>
        
        <Tabs defaultValue="generator" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`${tabsListClass} mb-12 md:mb-14`}>
            <TabsTrigger value="generator" className={tabTriggerClass}>
              {tabTriggerClass.includes('w-[calc') ? 'Generator' : 'Workout Generator'}
            </TabsTrigger>
            <TabsTrigger value="tracker" className={tabTriggerClass}>
              {tabTriggerClass.includes('w-[calc') ? 'Tracker' : 'Workout Tracker'}
            </TabsTrigger>
            <TabsTrigger value="history" className={tabTriggerClass}>
              {tabTriggerClass.includes('w-[calc') ? 'History' : 'Progress History'}
            </TabsTrigger>
            <TabsTrigger value="library" className={tabTriggerClass}>
              {tabTriggerClass.includes('w-[calc') ? 'Exercises' : 'Exercise Library'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="pt-6 md:pt-8">
            <WorkoutGenerator />
          </TabsContent>
          
          <TabsContent value="tracker" className="pt-6 md:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WorkoutTracker className="md:col-span-2" />
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="pt-6 md:pt-8">
            <WorkoutHistory />
          </TabsContent>
          
          <TabsContent value="library" className="pt-6 md:pt-8">
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
