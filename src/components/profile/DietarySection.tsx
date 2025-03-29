
import React from "react";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DietarySectionProps {
  form: UseFormReturn<any>;
}

const DietarySection: React.FC<DietarySectionProps> = ({ form }) => {
  // Expanded cuisine options
  const cuisineOptions = [
    "Italian", "Mexican", "Chinese", "Japanese", "Thai", "Indian", 
    "Mediterranean", "American", "French", "Spanish", "Greek", 
    "Korean", "Vietnamese", "Middle Eastern", "Caribbean", "Brazilian",
    "Moroccan", "Ethiopian", "Turkish", "Lebanese", "Persian",
    "British", "German", "Russian", "Polish", "Nordic",
    "Malaysian", "Indonesian", "Filipino", "Hawaiian", "Cajun",
    "Soul Food", "Southern US", "Tex-Mex", "Californian", "Fusion"
  ];
  
  const handleAddCuisine = (cuisine: string, currentSelections: string[]) => {
    if (!currentSelections.includes(cuisine)) {
      return [...currentSelections, cuisine];
    }
    return currentSelections;
  };

  const handleRemoveCuisine = (cuisineToRemove: string, currentSelections: string[]) => {
    return currentSelections.filter(cuisine => cuisine !== cuisineToRemove);
  };

  const handleAddAllergy = (allergy: string, currentAllergies: string[]) => {
    const allergyTrimmed = allergy.trim();
    if (allergyTrimmed && !currentAllergies.includes(allergyTrimmed)) {
      return [...currentAllergies, allergyTrimmed];
    }
    return currentAllergies;
  };

  const handleRemoveAllergy = (allergyToRemove: string, currentAllergies: string[]) => {
    return currentAllergies.filter(allergy => allergy !== allergyToRemove);
  };

  const handleAddDislikedIngredient = (ingredient: string, currentIngredients: string[]) => {
    const ingredientTrimmed = ingredient.trim();
    if (ingredientTrimmed && !currentIngredients.includes(ingredientTrimmed)) {
      return [...currentIngredients, ingredientTrimmed];
    }
    return currentIngredients;
  };

  const handleRemoveDislikedIngredient = (ingredientToRemove: string, currentIngredients: string[]) => {
    return currentIngredients.filter(ingredient => ingredient !== ingredientToRemove);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Utensils className="w-12 h-12 text-primary mx-auto mb-2" />
        <h2 className="text-xl font-semibold">Dietary Preferences</h2>
        <p className="text-muted-foreground">Tell us about your eating habits</p>
      </div>

      <FormField
        control={form.control}
        name="dietType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Dietary Restrictions</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no-restriction" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    No Restrictions
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="vegetarian" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Vegetarian
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="vegan" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Vegan
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="pescatarian" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Pescatarian
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="keto" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Ketogenic
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="paleo" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Paleo
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="gluten-free" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Gluten Free
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="dairy-free" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Dairy Free
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="low-carb" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Low Carb
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="high-protein" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    High Protein
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cuisinePreferences"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cuisine Preferences</FormLabel>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.map((cuisine) => (
                  <Badge 
                    key={cuisine}
                    variant={field.value.includes(cuisine) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (field.value.includes(cuisine)) {
                        field.onChange(handleRemoveCuisine(cuisine, field.value));
                      } else {
                        field.onChange(handleAddCuisine(cuisine, field.value));
                      }
                    }}
                  >
                    {cuisine}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((cuisine: string) => (
                  <Badge 
                    key={cuisine} 
                    className="bg-primary/80"
                  >
                    {cuisine}
                    <button
                      type="button"
                      className="ml-1"
                      onClick={() => field.onChange(handleRemoveCuisine(cuisine, field.value))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="allergies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Food Allergies or Intolerances</FormLabel>
            <div className="space-y-2">
              <div className="flex">
                <Input
                  placeholder="Add an allergy (e.g., peanuts, shellfish)"
                  className="rounded-r-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      field.onChange(handleAddAllergy(input.value, field.value));
                      input.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  className="px-3 bg-primary text-primary-foreground rounded-r-md"
                  onClick={(e) => {
                    const input = (e.currentTarget.previousSibling as HTMLInputElement);
                    field.onChange(handleAddAllergy(input.value, field.value));
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((allergy: string) => (
                  <Badge 
                    key={allergy} 
                    variant="destructive"
                  >
                    {allergy}
                    <button
                      type="button"
                      className="ml-1"
                      onClick={() => field.onChange(handleRemoveAllergy(allergy, field.value))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dislikedIngredients"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Disliked Ingredients</FormLabel>
            <div className="space-y-2">
              <div className="flex">
                <Input
                  placeholder="Add an ingredient (e.g., cilantro, olives)"
                  className="rounded-r-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      field.onChange(handleAddDislikedIngredient(input.value, field.value));
                      input.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  className="px-3 bg-primary text-primary-foreground rounded-r-md"
                  onClick={(e) => {
                    const input = (e.currentTarget.previousSibling as HTMLInputElement);
                    field.onChange(handleAddDislikedIngredient(input.value, field.value));
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((ingredient: string) => (
                  <Badge 
                    key={ingredient} 
                    variant="secondary"
                  >
                    {ingredient}
                    <button
                      type="button"
                      className="ml-1"
                      onClick={() => field.onChange(handleRemoveDislikedIngredient(ingredient, field.value))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DietarySection;
