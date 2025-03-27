import React, { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetFooter,
  SheetDescription
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, UtensilsCrossed, Dumbbell, BarChart, LineChart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DashboardSectionCustomizerProps {
  open: boolean;
  onClose: () => void;
  sections: {
    bmi: boolean;
    progress: boolean;
    meals: boolean;
    fitness: boolean;
  };
  userId: string;
  onSave: (sections: any) => void;
}

const DashboardSectionCustomizer: React.FC<DashboardSectionCustomizerProps> = ({
  open,
  onClose,
  sections,
  userId,
  onSave
}) => {
  const [selectedSections, setSelectedSections] = useState(sections);
  const { toast } = useToast();

  const handleToggle = (section: keyof typeof sections) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          dashboard_sections: selectedSections,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (error) throw error;
      
      onSave(selectedSections);
      toast({
        title: "Dashboard updated",
        description: "Your dashboard sections have been updated successfully.",
      });
      onClose();
    } catch (error) {
      console.error('Error saving dashboard sections:', error);
      toast({
        title: "Error saving changes",
        description: "There was a problem updating your dashboard. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={open => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Customize Dashboard Sections
          </SheetTitle>
          <SheetDescription>
            Choose which sections to display on your dashboard
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <BarChart className="h-5 w-5 text-primary" />
                <Label htmlFor="bmi" className="font-medium">BMI Calculator</Label>
              </div>
              <Switch 
                id="bmi" 
                checked={selectedSections.bmi}
                onCheckedChange={() => handleToggle('bmi')}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-primary" />
                <Label htmlFor="progress" className="font-medium">Progress Graph</Label>
              </div>
              <Switch 
                id="progress" 
                checked={selectedSections.progress}
                onCheckedChange={() => handleToggle('progress')}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <UtensilsCrossed className="h-5 w-5 text-primary" />
                <Label htmlFor="meals" className="font-medium">Meal Planning</Label>
              </div>
              <Switch 
                id="meals" 
                checked={selectedSections.meals}
                onCheckedChange={() => handleToggle('meals')}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                <Label htmlFor="fitness" className="font-medium">Fitness Tracking</Label>
              </div>
              <Switch 
                id="fitness" 
                checked={selectedSections.fitness}
                onCheckedChange={() => handleToggle('fitness')}
              />
            </div>
          </div>
        </div>
        
        <SheetFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSectionCustomizer;
