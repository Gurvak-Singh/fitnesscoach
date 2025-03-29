
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
import { Target, TrendingUp, Dumbbell, Heart, Scale, Percent } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

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
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="recomp" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer flex items-center">
                    <Scale className="w-4 h-4 mr-2" />
                    Body Recomposition
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Body fat percentage target */}
      <FormField
        control={form.control}
        name="bodyFatPercentage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <Percent className="w-4 h-4 mr-2" />
              Target Body Fat Percentage
            </FormLabel>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{field.value || 15}%</span>
                <span className="text-xs text-muted-foreground">
                  {field.value < 10 ? 'Athletic' : 
                   field.value < 15 ? 'Fitness' : 
                   field.value < 20 ? 'Healthy' : 'Standard'}
                </span>
              </div>
              <FormControl>
                <Slider
                  min={5}
                  max={30}
                  step={1}
                  value={[field.value || 15]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5%</span>
                <span>15%</span>
                <span>30%</span>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {(form.watch("fitnessGoal") === "weight-loss" || form.watch("fitnessGoal") === "recomp") && (
        <FormField
          control={form.control}
          name="buildMuscleWhileLosing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Focus on muscle retention during weight loss
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Prioritize high protein intake to maintain and build muscle while losing fat
                </p>
              </div>
            </FormItem>
          )}
        />
      )}

      {(form.watch("fitnessGoal") === "weight-loss" || form.watch("fitnessGoal") === "muscle-gain" || form.watch("fitnessGoal") === "recomp") && (
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
                    : form.watch("fitnessGoal") === "recomp"
                    ? "Weekly body change goal (kg)"
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

      <FormField
        control={form.control}
        name="proteinIntake"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Daily Protein Target</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select protein target" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="moderate">Moderate (0.8g per kg of bodyweight)</SelectItem>
                <SelectItem value="high">High (1.6g per kg of bodyweight)</SelectItem>
                <SelectItem value="very-high">Very High (2.2g per kg of bodyweight)</SelectItem>
                <SelectItem value="custom">Custom Amount</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("proteinIntake") === "custom" && (
        <FormField
          control={form.control}
          name="customProteinAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Protein Amount (g per day)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter protein amount" 
                  type="number" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default GoalSection;
