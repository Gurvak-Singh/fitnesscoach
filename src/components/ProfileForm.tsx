
import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import PersonalSection from "@/components/profile/PersonalSection";
import ActivitySection from "@/components/profile/ActivitySection";
import GoalSection from "@/components/profile/GoalSection";
import DietarySection from "@/components/profile/DietarySection";
import CookingSection from "@/components/profile/CookingSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProfileFormProps {
  isOnboarding: boolean;
  section?: string;
  onComplete?: () => void;
}

// Define form values interface to match our form structure
interface ProfileFormValues {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  fitnessGoal: string;
  targetWeight: string;
  weeklyGoal: string;
  dailyActivity: string;
  exerciseFrequency: string;
  sleepHours: string;
  dietType: string;
  cuisinePreferences: string[];
  allergies: string[];
  dislikedIngredients: string[];
  cookingTime: string;
  mealPrepPreference: string;
  cookingSkill: string;
  bodyFatPercentage: number;
  buildMuscleWhileLosing: boolean;
  proteinIntake: string;
  customProteinAmount: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  isOnboarding, 
  section = "all",
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  
  const form = useForm<ProfileFormValues>({
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
      bodyFatPercentage: 15,
      buildMuscleWhileLosing: true,
      proteinIntake: "high",
      customProteinAmount: "",
      
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
  
  // Calculate BMI whenever height or weight changes
  useEffect(() => {
    const height = parseFloat(form.watch("height"));
    const weight = parseFloat(form.watch("weight"));
    
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      
      if (bmi < 18.5) {
        setBmiCategory("underweight");
      } else if (bmi >= 18.5 && bmi < 25) {
        setBmiCategory("healthy");
      } else if (bmi >= 25 && bmi < 30) {
        setBmiCategory("overweight");
      } else {
        setBmiCategory("obese");
      }
      
      // If user is underweight, suggest weight gain
      if (bmi < 18.5 && form.watch("fitnessGoal") === "weight-loss") {
        form.setValue("fitnessGoal", "muscle-gain");
        toast.info("Based on your BMI, we recommend focusing on muscle gain rather than weight loss.");
      }
      
      // If user is overweight, suggest weight loss with muscle retention
      if (bmi >= 25 && form.watch("fitnessGoal") === "muscle-gain") {
        form.setValue("fitnessGoal", "recomp");
        form.setValue("buildMuscleWhileLosing", true);
        toast.info("Based on your BMI, we recommend body recomposition to build muscle while losing fat.");
      }
    }
  }, [form.watch("height"), form.watch("weight")]);
  
  // Fetch user profile on component mount
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) return;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setUserProfile(data);
          
          // Convert numeric values to strings for the form
          const updatedValues: ProfileFormValues = {
            name: data.name || "",
            age: data.age?.toString() || "",
            gender: data.gender || "",
            weight: data.weight?.toString() || "",
            height: data.height?.toString() || "",
            fitnessGoal: data.fitness_goal || "weight-loss",
            targetWeight: data.target_weight?.toString() || "",
            weeklyGoal: data.weekly_goal || "0.5",
            dailyActivity: data.daily_activity || "sedentary",
            exerciseFrequency: data.exercise_frequency || "1-2",
            sleepHours: data.sleep_hours || "7-8",
            dietType: data.diet_type || "no-restriction",
            cuisinePreferences: data.cuisine_preferences || [],
            allergies: data.allergies || [],
            dislikedIngredients: data.disliked_ingredients || [],
            cookingTime: data.cooking_time || "any",
            mealPrepPreference: data.meal_prep_preference || "daily",
            cookingSkill: data.cooking_skill || "beginner",
            bodyFatPercentage: data.body_fat_percentage || 15,
            buildMuscleWhileLosing: data.build_muscle_while_losing || true,
            proteinIntake: data.protein_intake || "high",
            customProteinAmount: data.custom_protein_amount?.toString() || ""
          };
          
          form.reset(updatedValues);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Could not fetch your profile');
      }
    };
    
    getProfile();
  }, [form]);

  // Reorder sections to have personal info first, then activity, then goals, then dietary/cooking
  const sections = [
    { id: "personal", label: "Personal", component: <PersonalSection form={form} /> },
    { id: "activity", label: "Activity", component: <ActivitySection form={form} /> },
    { id: "goals", label: "Goals", component: <GoalSection form={form} /> },
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

  const onSaveProfile = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to save your profile");
        return;
      }
      
      const formValues = form.getValues();
      
      // Map form values to database columns and convert string values to correct types
      const profileData = {
        id: session.user.id,
        name: formValues.name,
        age: formValues.age ? parseInt(formValues.age) : null,
        gender: formValues.gender,
        height: formValues.height ? parseFloat(formValues.height) : null,
        weight: formValues.weight ? parseFloat(formValues.weight) : null,
        fitness_goal: formValues.fitnessGoal,
        target_weight: formValues.targetWeight ? parseFloat(formValues.targetWeight) : null,
        weekly_goal: formValues.weeklyGoal,
        daily_activity: formValues.dailyActivity,
        exercise_frequency: formValues.exerciseFrequency,
        sleep_hours: formValues.sleepHours,
        diet_type: formValues.dietType,
        cuisine_preferences: formValues.cuisinePreferences,
        allergies: formValues.allergies,
        disliked_ingredients: formValues.dislikedIngredients,
        cooking_time: formValues.cookingTime,
        meal_prep_preference: formValues.mealPrepPreference,
        cooking_skill: formValues.cookingSkill,
        body_fat_percentage: formValues.bodyFatPercentage,
        build_muscle_while_losing: formValues.buildMuscleWhileLosing,
        protein_intake: formValues.proteinIntake,
        custom_protein_amount: formValues.customProteinAmount ? parseFloat(formValues.customProteinAmount) : null,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' });
        
      if (error) throw error;
      
      toast.success("Profile saved successfully!");
      
      if (isOnboarding && onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
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
              disabled={loading}
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : `Save ${sectionToRender.label}`}
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

      {/* Show BMI result if height and weight are entered */}
      {form.watch("height") && form.watch("weight") && bmiCategory && (
        <div className={`mb-6 p-4 rounded-lg ${
          bmiCategory === "healthy" ? "bg-green-100 dark:bg-green-900/30" :
          bmiCategory === "underweight" ? "bg-blue-100 dark:bg-blue-900/30" :
          "bg-amber-100 dark:bg-amber-900/30"
        }`}>
          <h3 className="font-medium mb-1">Your BMI Result</h3>
          <p className="text-sm">
            Based on your height and weight, your BMI indicates you are <span className="font-medium">{bmiCategory}</span>.
            {bmiCategory === "underweight" && " We recommend focusing on muscle gain and increasing your caloric intake."}
            {bmiCategory === "overweight" && " We recommend a balanced approach to reduce body fat while maintaining muscle mass."}
            {bmiCategory === "obese" && " We recommend focusing on weight loss with guidance from health professionals."}
          </p>
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
              disabled={loading}
            >
              {currentStep < sections.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Saving..." : "Complete"}
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
