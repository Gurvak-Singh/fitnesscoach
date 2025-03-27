
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AiMealGenerator from "@/components/meals/AiMealGenerator";
import MealPlanner from "@/components/meals/MealPlanner";
import GroceryList from "@/components/meals/GroceryList";
import CookingTutorials from "@/components/meals/CookingTutorials";

const Meals = () => {
  const [activeTab, setActiveTab] = useState("generator");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Meal Planning</h1>
        
        <Tabs defaultValue="generator" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="generator">AI Recipe Generator</TabsTrigger>
            <TabsTrigger value="planner">Meal Planner</TabsTrigger>
            <TabsTrigger value="grocery">Grocery Lists</TabsTrigger>
            <TabsTrigger value="tutorials">Cooking Tutorials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator">
            <AiMealGenerator />
          </TabsContent>
          
          <TabsContent value="planner">
            <MealPlanner />
          </TabsContent>
          
          <TabsContent value="grocery">
            <GroceryList />
          </TabsContent>
          
          <TabsContent value="tutorials">
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
