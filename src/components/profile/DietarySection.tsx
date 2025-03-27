
import React from "react";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Utensils, CheckCircle2, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface DietarySectionProps {
  form: UseFormReturn<any>;
}

const cuisineOptions = [
  { id: "italian", label: "Italian" },
  { id: "mexican", label: "Mexican" },
  { id: "asian", label: "Asian" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "indian", label: "Indian" },
  { id: "american", label: "American" },
  { id: "middle-eastern", label: "Middle Eastern" },
];

const DietarySection: React.FC<DietarySectionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Utensils className="w-12 h-12 text-primary mx-auto mb-2" />
        <h2 className="text-xl font-semibold">Dietary Preferences</h2>
        <p className="text-muted-foreground">Customize your meal plan to fit your needs</p>
      </div>

      <FormField
        control={form.control}
        name="dietType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Diet Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no-restriction" className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium cursor-pointer">No Restrictions</FormLabel>
                    <p className="text-xs text-muted-foreground">All types of foods</p>
                  </div>
                </FormItem>
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="vegetarian" className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium cursor-pointer">Vegetarian</FormLabel>
                    <p className="text-xs text-muted-foreground">No meat or fish</p>
                  </div>
                </FormItem>
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="vegan" className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium cursor-pointer">Vegan</FormLabel>
                    <p className="text-xs text-muted-foreground">No animal products</p>
                  </div>
                </FormItem>
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="pescatarian" className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium cursor-pointer">Pescatarian</FormLabel>
                    <p className="text-xs text-muted-foreground">Vegetarian plus seafood</p>
                  </div>
                </FormItem>
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="keto" className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium cursor-pointer">Keto</FormLabel>
                    <p className="text-xs text-muted-foreground">Low carb, high fat</p>
                  </div>
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
            <FormLabel className="flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Cuisine Preferences
            </FormLabel>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {cuisineOptions.map((cuisine) => (
                <FormItem
                  key={cuisine.id}
                  className="flex items-center space-x-2 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(cuisine.id)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), cuisine.id]
                          : (field.value || []).filter(
                              (value: string) => value !== cuisine.id
                            );
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal text-sm cursor-pointer">
                    {cuisine.label}
                  </FormLabel>
                </FormItem>
              ))}
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
            <FormLabel className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Allergies & Restrictions
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Nuts, Gluten, Dairy (comma separated)"
                {...field}
                value={field.value?.join(", ") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value.split(",").map((item) => item.trim()).filter(Boolean)
                  );
                }}
              />
            </FormControl>
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
            <FormControl>
              <Input
                placeholder="e.g. Mushrooms, Olives, Cilantro (comma separated)"
                {...field}
                value={field.value?.join(", ") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value.split(",").map((item) => item.trim()).filter(Boolean)
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DietarySection;
