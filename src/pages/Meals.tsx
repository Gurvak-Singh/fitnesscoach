
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AiMealGenerator from "@/components/meals/AiMealGenerator";
import MealPlanner from "@/components/meals/MealPlanner";
import GroceryList from "@/components/meals/GroceryList";
import CookingTutorials from "@/components/meals/CookingTutorials";
import { useTabLayoutClasses } from "@/hooks/use-mobile";

const Meals = () => {
  const [activeTab, setActiveTab] = useState("generator");
  const { tabsListClass, tabTriggerClass } = useTabLayoutClasses();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="container mx-auto pt-20 md:pt-24 pb-16 px-3 md:px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Meal Planning</h1>
        
        <Tabs defaultValue="generator" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12 md:mb-14">
            <TabsList className={`${tabsListClass}`}>
              <TabsTrigger value="generator" className={tabTriggerClass}>
                {tabTriggerClass.includes('w-[calc') ? 'AI Generator' : 'AI Recipe Generator'}
              </TabsTrigger>
              <TabsTrigger value="planner" className={tabTriggerClass}>
                Meal Planner
              </TabsTrigger>
              <TabsTrigger value="grocery" className={tabTriggerClass}>
                {tabTriggerClass.includes('w-[calc') ? 'Grocery' : 'Grocery Lists'}
              </TabsTrigger>
              <TabsTrigger value="tutorials" className={tabTriggerClass}>
                {tabTriggerClass.includes('w-[calc') ? 'Tutorials' : 'Cooking Tutorials'}
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="generator" className="pt-6 md:pt-8">
            <AiMealGenerator />
          </TabsContent>
          
          <TabsContent value="planner" className="pt-6 md:pt-8">
            <MealPlanner />
          </TabsContent>
          
          <TabsContent value="grocery" className="pt-6 md:pt-8">
            <GroceryList />
          </TabsContent>
          
          <TabsContent value="tutorials" className="pt-6 md:pt-8">
            <CookingTutorials />
          </TabsContent>
        </Tabs>
        
        {/* Footer content */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>FitLife Coach — Your personalized fitness and nutrition journey</p>
        </div>
      </div>
    </div>
  );
};

export default Meals;
