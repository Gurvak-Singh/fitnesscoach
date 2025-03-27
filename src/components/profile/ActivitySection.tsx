
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
import { Activity, Calendar, Clock } from "lucide-react";

interface ActivitySectionProps {
  form: UseFormReturn<any>;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Activity className="w-12 h-12 text-primary mx-auto mb-2" />
        <h2 className="text-xl font-semibold">Your Activity Level</h2>
        <p className="text-muted-foreground">Tell us about your daily activity and habits</p>
      </div>

      <FormField
        control={form.control}
        name="dailyActivity"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>What best describes your daily routine?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="sedentary" className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium cursor-pointer">Sedentary</FormLabel>
                    <p className="text-xs text-muted-foreground">Desk job, little activity throughout the day</p>
                  </div>
                </FormItem>
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="lightly-active" className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium cursor-pointer">Lightly Active</FormLabel>
                    <p className="text-xs text-muted-foreground">Some walking, standing or light activities during the day</p>
                  </div>
                </FormItem>
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="moderately-active" className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium cursor-pointer">Moderately Active</FormLabel>
                    <p className="text-xs text-muted-foreground">Regular movement, physical job or standing job</p>
                  </div>
                </FormItem>
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="very-active" className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium cursor-pointer">Very Active</FormLabel>
                    <p className="text-xs text-muted-foreground">Physical labor or highly active job</p>
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
        name="exerciseFrequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Exercise Frequency
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="How often do you exercise?" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="rarely">Rarely or never</SelectItem>
                <SelectItem value="1-2">1-2 times per week</SelectItem>
                <SelectItem value="3-4">3-4 times per week</SelectItem>
                <SelectItem value="5+">5+ times per week</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sleepHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Sleep Hours
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Average hours of sleep per night" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="less-than-6">Less than 6 hours</SelectItem>
                <SelectItem value="6-7">6-7 hours</SelectItem>
                <SelectItem value="7-8">7-8 hours</SelectItem>
                <SelectItem value="8+">More than 8 hours</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ActivitySection;
