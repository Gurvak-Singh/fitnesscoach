
import React from "react";
import { Utensils, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MealPlanProps {
  className?: string;
}

const MealPlan: React.FC<MealPlanProps> = ({ className }) => {
  // Mock data - in a real app, these would be generated based on user's goals
  const meals = [
    {
      type: "Breakfast",
      name: "Greek Yogurt Bowl",
      protein: 24,
      calories: 320,
    },
    {
      type: "Lunch",
      name: "Chicken Salad",
      protein: 35,
      calories: 450,
    },
    {
      type: "Dinner",
      name: "Salmon with Quinoa",
      protein: 40,
      calories: 520,
    },
  ];

  return (
    <div className={cn("glass-card rounded-2xl p-6 animate-fade-in", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Utensils className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Today's Meal Plan</h2>
        </div>
        <button className="text-primary text-sm font-medium hover:underline flex items-center">
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {meals.map((meal, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-secondary/40 hover-scale soft-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/10 rounded-full">
                  {meal.type}
                </span>
                <h3 className="font-medium mt-2">{meal.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {meal.calories} cal
                </p>
                <p className="text-sm font-medium">{meal.protein}g protein</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Daily total</p>
          <p className="font-medium">1,290 calories</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Protein</p>
          <p className="font-medium">99g</p>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
