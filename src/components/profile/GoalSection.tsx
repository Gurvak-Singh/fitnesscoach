
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Target, TrendingUp, Dumbbell, Heart } from "lucide-react";

interface GoalSectionProps {
  form: UseFormReturn<any>;
}

const GoalSection: React.FC<GoalSectionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Target className="w-12 h-12 text-primary mx-auto mb-2" />
        <h2 className="text-xl font-semibold">Set Your Fitness Goals</h2>
        <p className="text-muted-foreground">What are you looking to achieve?</p>
      </div>

      <FormField
        control={form.control}
        name="fitnessGoal"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>What is your primary fitness goal?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="weight-loss" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Weight Loss
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="muscle-gain" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer flex items-center">
                    <Dumbbell className="w-4 h-4 mr-2" />
                    Muscle Gain
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="endurance" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Endurance
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="maintenance" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Maintenance
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {(form.watch("fitnessGoal") === "weight-loss" || form.watch("fitnessGoal") === "muscle-gain") && (
        <>
          <FormField
            control={form.control}
            name="targetWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Weight (kg)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your target weight" 
                    type="number" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weeklyGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {form.watch("fitnessGoal") === "weight-loss" 
                    ? "Weekly weight loss goal (kg)" 
                    : "Weekly weight gain goal (kg)"}
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weekly goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0.25">0.25 kg per week (Very gradual)</SelectItem>
                    <SelectItem value="0.5">0.5 kg per week (Recommended)</SelectItem>
                    <SelectItem value="0.75">0.75 kg per week (Moderate)</SelectItem>
                    <SelectItem value="1">1.0 kg per week (Challenging)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};

export default GoalSection;
