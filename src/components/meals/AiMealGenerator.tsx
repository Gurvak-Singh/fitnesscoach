
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, ChefHat, ThumbsUp, ThumbsDown, Save, RefreshCw, Dumbbell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Slider } from "@/components/ui/slider";

// Extended mock recipes data with high protein options
const mockRecipes = [
  {
    id: 1,
    title: "High-Protein Quinoa Bowl",
    description: "A balanced meal with complete proteins and essential nutrients.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    prepTime: "20 min",
    calories: 450,
    macros: { protein: 32, carbs: 42, fat: 18 },
    ingredients: [
      "1 cup cooked quinoa",
      "6 oz grilled chicken breast",
      "1/2 avocado, sliced",
      "1/4 cup black beans",
      "1/4 cup corn",
      "Cherry tomatoes",
      "2 tbsp lime dressing"
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Grill chicken breast with preferred seasonings",
      "Assemble all ingredients in a bowl",
      "Drizzle with lime dressing and serve"
    ],
    nutrients: ["High Protein", "Fiber", "Vitamin C", "Healthy Fats"],
    tags: ["high-protein", "muscle-building"]
  },
  {
    id: 2,
    title: "Mediterranean Salmon Plate",
    description: "Omega-3 rich salmon with Mediterranean vegetables.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    prepTime: "25 min",
    calories: 520,
    macros: { protein: 40, carbs: 28, fat: 22 },
    ingredients: [
      "6 oz salmon fillet",
      "1 cup roasted vegetables (zucchini, bell peppers, red onion)",
      "1/2 cup couscous",
      "2 tbsp tzatziki sauce",
      "1/4 cup cucumber, diced",
      "Lemon wedge",
      "Fresh dill"
    ],
    instructions: [
      "Season salmon with salt, pepper, and lemon",
      "Bake at 400°F for 12-15 minutes",
      "Prepare couscous according to package",
      "Roast vegetables with olive oil at 425°F for 20 minutes",
      "Plate all components and garnish with fresh dill"
    ],
    nutrients: ["Omega-3", "High Protein", "Vitamin D", "Antioxidants"],
    tags: ["high-protein", "low-carb"]
  },
  {
    id: 3,
    title: "Protein-Packed Greek Yogurt Parfait",
    description: "Perfect breakfast or snack with exceptional protein content.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    prepTime: "10 min",
    calories: 380,
    macros: { protein: 35, carbs: 30, fat: 12 },
    ingredients: [
      "2 cups Greek yogurt (0% fat)",
      "1 scoop protein powder",
      "1/4 cup mixed berries",
      "2 tbsp honey",
      "1/4 cup low-sugar granola",
      "1 tbsp chia seeds",
      "1 tbsp almond butter"
    ],
    instructions: [
      "Mix protein powder into Greek yogurt",
      "Layer yogurt, berries, and granola in a glass",
      "Drizzle with honey and almond butter",
      "Top with chia seeds"
    ],
    nutrients: ["High Protein", "Probiotics", "Antioxidants", "Fiber"],
    tags: ["high-protein", "quick-prep", "breakfast"]
  },
  {
    id: 4,
    title: "Lean Beef Stir Fry",
    description: "Muscle-building high protein dinner with minimal fat.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    prepTime: "15 min",
    calories: 460,
    macros: { protein: 45, carbs: 28, fat: 16 },
    ingredients: [
      "8 oz lean beef strips",
      "2 cups mixed vegetables (broccoli, bell peppers, snap peas)",
      "2 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "2 tbsp low-sodium soy sauce",
      "1 tbsp sesame oil",
      "1/2 cup brown rice"
    ],
    instructions: [
      "Cook brown rice according to package",
      "Stir-fry beef in a hot wok until browned",
      "Add vegetables, garlic, and ginger",
      "Add soy sauce and sesame oil",
      "Serve over brown rice"
    ],
    nutrients: ["High Protein", "Iron", "Vitamin C", "Zinc"],
    tags: ["high-protein", "muscle-building", "low-fat"]
  }
];

const AiMealGenerator = () => {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [preferences, setPreferences] = useState({
    highProtein: true,
    lowCarb: false,
    vegetarian: false,
    quick: true,
    proteinTarget: 40 // Default target percentage of calories from protein
  });
  
  const currentRecipe = recipes[currentRecipeIndex];
  
  // Fetch user profile to get dietary preferences
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) return;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setUserProfile(data);
          
          // Update preferences based on profile
          const newPreferences = { ...preferences };
          
          if (data.fitness_goal === 'muscle-gain' || data.build_muscle_while_losing) {
            newPreferences.highProtein = true;
          }
          
          if (data.diet_type === 'low-carb' || data.diet_type === 'keto') {
            newPreferences.lowCarb = true;
          }
          
          if (data.diet_type === 'vegetarian' || data.diet_type === 'vegan') {
            newPreferences.vegetarian = true;
          }
          
          // Set protein target based on user's profile
          if (data.protein_intake === 'high') {
            newPreferences.proteinTarget = 40; // 40% of calories from protein
          } else if (data.protein_intake === 'very-high') {
            newPreferences.proteinTarget = 50; // 50% of calories from protein
          } else if (data.protein_intake === 'moderate') {
            newPreferences.proteinTarget = 30; // 30% of calories from protein
          }
          
          setPreferences(newPreferences);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  const generateNewRecipe = () => {
    setLoading(true);
    // In a real app, this would call an API to generate a new recipe
    // based on user preferences and dietary needs
    setTimeout(() => {
      // Mock new recipe generation by cycling through existing ones
      setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
      setLoading(false);
      
      // Show protein-focused message if high protein is enabled
      if (preferences.highProtein) {
        toast.success("High-protein recipe generated to support your muscle-building goals!");
      } else {
        toast.success("New recipe generated based on your preferences!");
      }
    }, 1500);
  };
  
  const saveRecipe = () => {
    toast.success("Recipe saved to your meal plan!");
  };
  
  const rateMeal = (liked: boolean) => {
    toast.success(liked ? "We'll suggest more recipes like this!" : "We'll avoid recipes like this in the future.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChefHat className="mr-2 h-5 w-5" />
            Personalize
          </CardTitle>
          <CardDescription>
            Customize your meal recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-protein" className="flex items-center">
                  <Dumbbell className="w-4 h-4 mr-2 text-primary" />
                  High Protein
                </Label>
                <p className="text-xs text-muted-foreground">
                  Focus on protein-rich meals for muscle building
                </p>
              </div>
              <Switch 
                id="high-protein"
                checked={preferences.highProtein}
                onCheckedChange={(checked) => setPreferences({...preferences, highProtein: checked})}
              />
            </div>
            
            {preferences.highProtein && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <Label>Protein Target: {preferences.proteinTarget}%</Label>
                  <span className="text-xs text-muted-foreground">
                    {preferences.proteinTarget < 30 ? 'Standard' : 
                     preferences.proteinTarget < 40 ? 'Athletic' : 
                     preferences.proteinTarget < 50 ? 'Bodybuilding' : 'Maximum'}
                  </span>
                </div>
                <Slider
                  min={20}
                  max={60}
                  step={5}
                  value={[preferences.proteinTarget]}
                  onValueChange={(vals) => setPreferences({...preferences, proteinTarget: vals[0]})}
                />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="low-carb">Low Carb</Label>
                <p className="text-xs text-muted-foreground">
                  Reduce carbohydrate content
                </p>
              </div>
              <Switch 
                id="low-carb"
                checked={preferences.lowCarb}
                onCheckedChange={(checked) => setPreferences({...preferences, lowCarb: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="vegetarian">Vegetarian</Label>
                <p className="text-xs text-muted-foreground">
                  No meat or fish
                </p>
              </div>
              <Switch 
                id="vegetarian"
                checked={preferences.vegetarian}
                onCheckedChange={(checked) => setPreferences({...preferences, vegetarian: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="quick">Quick Meals</Label>
                <p className="text-xs text-muted-foreground">
                  Under 30 minutes prep time
                </p>
              </div>
              <Switch 
                id="quick"
                checked={preferences.quick}
                onCheckedChange={(checked) => setPreferences({...preferences, quick: checked})}
              />
            </div>
          </div>
          
          <Separator />
          
          <Button 
            className="w-full"
            onClick={generateNewRecipe}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Recipe
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{currentRecipe.title}</CardTitle>
              <CardDescription>{currentRecipe.description}</CardDescription>
            </div>
            <Badge variant="outline" className="flex items-center">
              <Utensils className="mr-1 h-3 w-3" />
              {currentRecipe.prepTime}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipe image */}
          <div 
            className="w-full h-48 rounded-md bg-cover bg-center"
            style={{ backgroundImage: `url(${currentRecipe.image})` }}
          />
          
          {/* Macros */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-secondary/50 p-3 rounded-md">
              <p className="text-sm font-medium">{currentRecipe.macros.protein}g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded-md">
              <p className="text-sm font-medium">{currentRecipe.macros.carbs}g</p>
              <p className="text-xs text-muted-foreground">Carbs</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded-md">
              <p className="text-sm font-medium">{currentRecipe.macros.fat}g</p>
              <p className="text-xs text-muted-foreground">Fat</p>
            </div>
          </div>
          
          {/* Protein percentage calculation */}
          {preferences.highProtein && (
            <div className="p-3 bg-primary/10 rounded-md">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium flex items-center">
                  <Dumbbell className="w-4 h-4 mr-2 text-primary" />
                  Protein Content
                </p>
                <Badge variant="secondary">
                  {Math.round((currentRecipe.macros.protein * 4 / currentRecipe.calories) * 100)}% of calories
                </Badge>
              </div>
              <div className="w-full bg-secondary/50 rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-300" 
                  style={{ width: `${Math.min(100, Math.round((currentRecipe.macros.protein * 4 / currentRecipe.calories) * 100))}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div>
              <h3 className="font-medium mb-2">Ingredients</h3>
              <ul className="space-y-1 text-sm">
                {currentRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Instructions */}
            <div>
              <h3 className="font-medium mb-2">Instructions</h3>
              <ol className="space-y-1 text-sm list-decimal list-inside">
                {currentRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
          
          {/* Nutritional highlights */}
          <div>
            <h3 className="font-medium mb-2">Nutritional Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {currentRecipe.nutrients.map((nutrient, index) => (
                <Badge key={index} variant={nutrient === "High Protein" ? "default" : "secondary"}>
                  {nutrient}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              size="icon"
              onClick={() => rateMeal(true)}
              title="Like this recipe"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => rateMeal(false)}
              title="Dislike this recipe"
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={saveRecipe}>
            <Save className="mr-2 h-4 w-4" />
            Save to Meal Plan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AiMealGenerator;
