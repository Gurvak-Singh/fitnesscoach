
import React from "react";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Clock, ChefHat, Calendar } from "lucide-react";

interface CookingSectionProps {
  form: UseFormReturn<any>;
}

const CookingSection: React.FC<CookingSectionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <ChefHat className="w-12 h-12 text-primary mx-auto mb-2" />
        <h2 className="text-xl font-semibold">Cooking Preferences</h2>
        <p className="text-muted-foreground">Tell us about your cooking style</p>
      </div>

      <FormField
        control={form.control}
        name="cookingTime"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Cooking Time Preference
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="quick" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Quick meals (&lt;30 mins)
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="medium" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Medium (30-60 mins)
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="elaborate" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Elaborate (&gt;60 mins)
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="any" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Any time range
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
        name="mealPrepPreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Meal Preparation Style
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal prep style" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="daily">Daily cooking</SelectItem>
                <SelectItem value="batch">Batch cooking (2-3 days at once)</SelectItem>
                <SelectItem value="weekly">Weekly meal prep</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cookingSkill"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <ChefHat className="w-4 h-4 mr-2" />
              Cooking Skill Level
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your cooking skill level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="beginner">Beginner (basic cooking skills)</SelectItem>
                <SelectItem value="intermediate">Intermediate (comfortable with most recipes)</SelectItem>
                <SelectItem value="advanced">Advanced (skilled home cook)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CookingSection;
