
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Activity, LayoutDashboard } from "lucide-react";

interface DashboardCustomizerProps {
  open: boolean;
  onClose: () => void;
  preferences: string[];
  onSave: (preferences: string[]) => void;
}

const widgetOptions = [
  { id: "streak", label: "Streak Counter", icon: Trophy },
  { id: "progress", label: "Progress to Goal", icon: TrendingUp },
  { id: "activity", label: "Today's Activity", icon: Activity },
];

const DashboardCustomizer: React.FC<DashboardCustomizerProps> = ({
  open,
  onClose,
  preferences,
  onSave,
}) => {
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>(preferences);

  const handleCheckboxChange = (id: string) => {
    setSelectedWidgets(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSave = () => {
    onSave(selectedWidgets);
  };

  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            Customize Your Dashboard
          </DialogTitle>
          <DialogDescription>
            Choose which widgets appear on your dashboard
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {widgetOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div 
                key={option.id} 
                className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-secondary/50"
              >
                <Checkbox 
                  id={option.id}
                  checked={selectedWidgets.includes(option.id)}
                  onCheckedChange={() => handleCheckboxChange(option.id)}
                />
                <div className="flex flex-1 items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Label 
                    htmlFor={option.id} 
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {option.label}
                  </Label>
                </div>
              </div>
            );
          })}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardCustomizer;
