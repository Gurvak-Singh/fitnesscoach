
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import GoalSection from "@/components/profile/GoalSection";
import ActivitySection from "@/components/profile/ActivitySection";
import DietarySection from "@/components/profile/DietarySection";
import CookingSection from "@/components/profile/CookingSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { toast } from "sonner";

interface ProfileFormProps {
  isOnboarding: boolean;
  section?: string;
  onComplete?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  isOnboarding, 
  section = "all",
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm({
    defaultValues: {
      // Personal
      name: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
      
      // Goals
      fitnessGoal: "weight-loss",
      targetWeight: "",
      weeklyGoal: "0.5",
      
      // Activity
      dailyActivity: "sedentary",
      exerciseFrequency: "1-2",
      sleepHours: "7-8",
      
      // Dietary
      dietType: "no-restriction",
      cuisinePreferences: [],
      allergies: [],
      dislikedIngredients: [],
      
      // Cooking
      cookingTime: "any",
      mealPrepPreference: "daily",
      cookingSkill: "beginner"
    },
  });

  const sections = [
    { id: "goals", label: "Goals", component: <GoalSection form={form} /> },
    { id: "activity", label: "Activity", component: <ActivitySection form={form} /> },
    { id: "dietary", label: "Dietary", component: <DietarySection form={form} /> },
    { id: "cooking", label: "Cooking", component: <CookingSection form={form} /> },
  ];

  const handleNextStep = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSaveProfile();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSaveProfile = () => {
    // Here you would save the profile data to your backend or local storage
    console.log(form.getValues());
    toast.success("Profile saved successfully!");
    
    if (isOnboarding && onComplete) {
      onComplete();
    }
  };

  if (!isOnboarding && section !== "all") {
    // Render only a specific section for non-onboarding mode
    const sectionToRender = sections.find(s => s.id === section) || sections[0];

    return (
      <div className="glass-card rounded-2xl p-6 animate-fade-in">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSaveProfile)}>
            {sectionToRender.component}
            <Button 
              type="submit" 
              className="w-full mt-6"
            >
              <Save className="mr-2 h-4 w-4" />
              Save {sectionToRender.label}
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  // Onboarding wizard with steps
  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      {isOnboarding && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {sections.map((section, index) => (
              <span 
                key={section.id}
                className={`text-xs ${index === currentStep ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
              >
                {section.label}
              </span>
            ))}
          </div>
          <div className="w-full bg-secondary h-2 rounded-full">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSaveProfile)}>
          {sections[currentStep].component}
          
          <div className="flex justify-between mt-6 space-x-4">
            {currentStep > 0 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevStep}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
            <Button 
              type="button" 
              onClick={handleNextStep}
              className={currentStep === 0 ? 'w-full' : 'flex-1'}
            >
              {currentStep < sections.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Complete
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
