
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock meal data
const mockMeals = {
  monday: [
    { id: 1, type: "breakfast", name: "Greek Yogurt Bowl", calories: 320, protein: 24 },
    { id: 2, type: "lunch", name: "Chicken Caesar Salad", calories: 450, protein: 35 },
    { id: 3, type: "dinner", name: "Salmon with Quinoa", calories: 520, protein: 40 }
  ],
  tuesday: [
    { id: 4, type: "breakfast", name: "Protein Smoothie", calories: 350, protein: 28 },
    { id: 5, type: "lunch", name: "Turkey Wrap", calories: 420, protein: 32 },
    { id: 6, type: "dinner", name: "Stir-Fry Vegetables with Tofu", calories: 480, protein: 25 }
  ],
  wednesday: [
    { id: 7, type: "breakfast", name: "Egg White Omelette", calories: 300, protein: 26 },
    { id: 8, type: "lunch", name: "Quinoa Salad", calories: 380, protein: 18 },
    { id: 9, type: "dinner", name: "Grilled Chicken with Sweet Potato", calories: 550, protein: 42 }
  ],
  thursday: [
    { id: 10, type: "breakfast", name: "Chia Pudding", calories: 280, protein: 15 },
    { id: 11, type: "lunch", name: "Mediterranean Bowl", calories: 420, protein: 22 },
    { id: 12, type: "dinner", name: "Baked Cod with Vegetables", calories: 490, protein: 38 }
  ],
  friday: [
    { id: 13, type: "breakfast", name: "Protein Pancakes", calories: 340, protein: 24 },
    { id: 14, type: "lunch", name: "Tuna Salad", calories: 380, protein: 30 },
    { id: 15, type: "dinner", name: "Lean Beef Stir-Fry", calories: 520, protein: 45 }
  ],
  saturday: [
    { id: 16, type: "breakfast", name: "Avocado Toast", calories: 310, protein: 12 },
    { id: 17, type: "lunch", name: "Chickpea Curry", calories: 420, protein: 18 },
    { id: 18, type: "dinner", name: "Grilled Fish Tacos", calories: 480, protein: 32 }
  ],
  sunday: [
    { id: 19, type: "breakfast", name: "Veggie Frittata", calories: 320, protein: 22 },
    { id: 20, type: "lunch", name: "Lentil Soup with Bread", calories: 400, protein: 20 },
    { id: 21, type: "dinner", name: "Roast Chicken with Vegetables", calories: 550, protein: 45 }
  ]
};

// Available recipes to add
const availableRecipes = [
  { id: 101, name: "Overnight Oats", type: "breakfast", calories: 350, protein: 18 },
  { id: 102, name: "Protein Bowl", type: "lunch", calories: 450, protein: 35 },
  { id: 103, name: "Stuffed Bell Peppers", type: "dinner", calories: 480, protein: 28 },
  { id: 104, name: "Berry Smoothie", type: "breakfast", calories: 280, protein: 15 },
  { id: 105, name: "Pesto Pasta with Chicken", type: "lunch", calories: 520, protein: 32 },
  { id: 106, name: "Baked Salmon", type: "dinner", calories: 420, protein: 38 }
];

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(mockMeals);
  const [currentDay, setCurrentDay] = useState<keyof typeof mockMeals>("monday");
  const isMobile = useIsMobile();
  
  const calculateDailyMacros = (day: keyof typeof mockMeals) => {
    return mealPlan[day].reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        return acc;
      },
      { calories: 0, protein: 0 }
    );
  };
  
  const addMeal = (recipe: typeof availableRecipes[0]) => {
    setMealPlan(prev => ({
      ...prev,
      [currentDay]: [...prev[currentDay], recipe]
    }));
    toast.success(`Added ${recipe.name} to ${currentDay}'s meal plan`);
  };
  
  const removeMeal = (mealId: number) => {
    setMealPlan(prev => ({
      ...prev,
      [currentDay]: prev[currentDay].filter(meal => meal.id !== mealId)
    }));
    toast.success(`Meal removed from ${currentDay}'s plan`);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="flex items-center text-lg md:text-xl">
                <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Weekly Meal Plan
              </CardTitle>
              <CardDescription className="text-xs md:text-sm mt-1">
                Plan your meals for optimal nutrition
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs md:text-sm text-muted-foreground">Daily goal:</p>
              <Badge variant="outline" className="text-xs">1800-2200 cal</Badge>
              <Badge variant="outline" className="text-xs">120g protein</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={currentDay} onValueChange={(v) => setCurrentDay(v as keyof typeof mockMeals)}>
            <TabsList className={`grid ${isMobile ? 'grid-cols-4 gap-1 mb-2' : 'grid-cols-7'}`}>
              {isMobile ? (
                <>
                  <TabsTrigger value="monday">Mon</TabsTrigger>
                  <TabsTrigger value="tuesday">Tue</TabsTrigger>
                  <TabsTrigger value="wednesday">Wed</TabsTrigger>
                  <TabsTrigger value="thursday">Thu</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="monday">Mon</TabsTrigger>
                  <TabsTrigger value="tuesday">Tue</TabsTrigger>
                  <TabsTrigger value="wednesday">Wed</TabsTrigger>
                  <TabsTrigger value="thursday">Thu</TabsTrigger>
                  <TabsTrigger value="friday">Fri</TabsTrigger>
                  <TabsTrigger value="saturday">Sat</TabsTrigger>
                  <TabsTrigger value="sunday">Sun</TabsTrigger>
                </>
              )}
            </TabsList>
            
            {isMobile && (
              <TabsList className="grid grid-cols-3 gap-1 mb-4">
                <TabsTrigger value="friday">Fri</TabsTrigger>
                <TabsTrigger value="saturday">Sat</TabsTrigger>
                <TabsTrigger value="sunday">Sun</TabsTrigger>
              </TabsList>
            )}
            
            {Object.keys(mealPlan).map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                  {/* Breakfast */}
                  <Card className="overflow-hidden">
                    <CardHeader className="py-3 px-3 md:px-4 bg-secondary/20">
                      <CardTitle className="text-sm font-medium">Breakfast</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 py-2 px-2 md:px-4">
                      {mealPlan[day as keyof typeof mealPlan]
                        .filter(meal => meal.type === "breakfast")
                        .map(meal => (
                          <div key={meal.id} className="flex items-center justify-between bg-secondary/40 p-2 rounded-md">
                            <div className="pr-2">
                              <p className="text-xs md:text-sm font-medium truncate">{meal.name}</p>
                              <div className="flex text-xs text-muted-foreground space-x-2">
                                <span>{meal.calories} cal</span>
                                <span>{meal.protein}g</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 shrink-0"
                              onClick={() => removeMeal(meal.id)}
                            >
                              <X className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </div>
                        ))}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs md:text-sm text-muted-foreground">
                            <Plus className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                            Add breakfast
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="max-h-[200px] overflow-y-auto">
                          {availableRecipes
                            .filter(recipe => recipe.type === "breakfast")
                            .map(recipe => (
                              <DropdownMenuItem 
                                key={recipe.id}
                                onClick={() => addMeal(recipe)}
                                className="text-xs md:text-sm"
                              >
                                {recipe.name} ({recipe.calories} cal)
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardContent>
                  </Card>
                  
                  {/* Lunch */}
                  <Card className="overflow-hidden">
                    <CardHeader className="py-3 px-3 md:px-4 bg-secondary/20">
                      <CardTitle className="text-sm font-medium">Lunch</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 py-2 px-2 md:px-4">
                      {mealPlan[day as keyof typeof mealPlan]
                        .filter(meal => meal.type === "lunch")
                        .map(meal => (
                          <div key={meal.id} className="flex items-center justify-between bg-secondary/40 p-2 rounded-md">
                            <div className="pr-2">
                              <p className="text-xs md:text-sm font-medium truncate">{meal.name}</p>
                              <div className="flex text-xs text-muted-foreground space-x-2">
                                <span>{meal.calories} cal</span>
                                <span>{meal.protein}g</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 shrink-0"
                              onClick={() => removeMeal(meal.id)}
                            >
                              <X className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </div>
                        ))}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs md:text-sm text-muted-foreground">
                            <Plus className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                            Add lunch
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="max-h-[200px] overflow-y-auto">
                          {availableRecipes
                            .filter(recipe => recipe.type === "lunch")
                            .map(recipe => (
                              <DropdownMenuItem 
                                key={recipe.id}
                                onClick={() => addMeal(recipe)}
                                className="text-xs md:text-sm"
                              >
                                {recipe.name} ({recipe.calories} cal)
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardContent>
                  </Card>
                  
                  {/* Dinner */}
                  <Card className="overflow-hidden">
                    <CardHeader className="py-3 px-3 md:px-4 bg-secondary/20">
                      <CardTitle className="text-sm font-medium">Dinner</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 py-2 px-2 md:px-4">
                      {mealPlan[day as keyof typeof mealPlan]
                        .filter(meal => meal.type === "dinner")
                        .map(meal => (
                          <div key={meal.id} className="flex items-center justify-between bg-secondary/40 p-2 rounded-md">
                            <div className="pr-2">
                              <p className="text-xs md:text-sm font-medium truncate">{meal.name}</p>
                              <div className="flex text-xs text-muted-foreground space-x-2">
                                <span>{meal.calories} cal</span>
                                <span>{meal.protein}g</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 shrink-0"
                              onClick={() => removeMeal(meal.id)}
                            >
                              <X className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </div>
                        ))}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs md:text-sm text-muted-foreground">
                            <Plus className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                            Add dinner
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="max-h-[200px] overflow-y-auto">
                          {availableRecipes
                            .filter(recipe => recipe.type === "dinner")
                            .map(recipe => (
                              <DropdownMenuItem 
                                key={recipe.id}
                                onClick={() => addMeal(recipe)}
                                className="text-xs md:text-sm"
                              >
                                {recipe.name} ({recipe.calories} cal)
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Day summary */}
                <Card>
                  <CardContent className="flex flex-col md:flex-row md:items-center justify-between py-3 px-3 md:px-4 md:py-4 gap-2">
                    <div>
                      <p className="text-xs md:text-sm font-medium">Daily Total</p>
                      <p className="text-xs text-muted-foreground">
                        {calculateDailyMacros(day as keyof typeof mockMeals).calories} calories | 
                        {calculateDailyMacros(day as keyof typeof mockMeals).protein}g protein
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant={calculateDailyMacros(day as keyof typeof mockMeals).calories >= 1800 && 
                                calculateDailyMacros(day as keyof typeof mockMeals).calories <= 2200 ? 
                                "default" : "destructive"}
                        className="text-xs"
                      >
                        Calories: {calculateDailyMacros(day as keyof typeof mockMeals).calories >= 1800 && 
                                    calculateDailyMacros(day as keyof typeof mockMeals).calories <= 2200 ? 
                                    "On Target" : "Off Target"}
                      </Badge>
                      <Badge 
                        variant={calculateDailyMacros(day as keyof typeof mockMeals).protein >= 120 ? 
                                "default" : "secondary"}
                        className="text-xs"
                      >
                        Protein: {calculateDailyMacros(day as keyof typeof mockMeals).protein >= 120 ? 
                                    "On Target" : "Needs More"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row gap-2 md:justify-between p-3 md:p-4">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="w-full md:w-auto">Reset Week</Button>
          <Button size={isMobile ? "sm" : "default"} className="w-full md:w-auto">Generate Shopping List</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MealPlanner;
