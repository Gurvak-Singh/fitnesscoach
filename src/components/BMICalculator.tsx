
import React, { useState, useEffect } from "react";
import { Activity, Weight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BMICalculatorProps {
  className?: string;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ className }) => {
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("text-primary");

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    // BMI formula: weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(Math.round(bmiValue * 10) / 10);

    // Determine BMI category
    if (bmiValue < 18.5) {
      setCategory("Underweight");
      setCategoryColor("text-blue-500");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory("Healthy");
      setCategoryColor("text-green-500");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory("Overweight");
      setCategoryColor("text-amber-500");
    } else {
      setCategory("Obese");
      setCategoryColor("text-red-500");
    }
  };

  return (
    <div className={cn("glass-card rounded-2xl p-6 animate-fade-in", className)}>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          <Weight className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">BMI Calculator</h2>
      </div>

      <div className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">Height (cm)</label>
          <div className="flex items-center">
            <input
              type="range"
              min="120"
              max="220"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="ml-3 min-w-[40px] text-right">{height}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Weight (kg)</label>
          <div className="flex items-center">
            <input
              type="range"
              min="30"
              max="150"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="ml-3 min-w-[40px] text-right">{weight}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Your BMI</p>
            <p className="text-2xl font-semibold">{bmi}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className={`text-lg font-medium ${categoryColor}`}>{category}</p>
          </div>
        </div>

        <div className="mt-4 w-full bg-secondary/50 rounded-full h-3">
          <div className="relative h-full">
            {/* BMI scale markers */}
            <div className="absolute inset-x-0 top-full mt-1 flex justify-between text-xs text-muted-foreground">
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
            </div>
            
            {/* BMI indicator */}
            <div 
              className="absolute h-6 w-6 rounded-full bg-white border-2 border-primary shadow-md transform -translate-y-1/2 -ml-3"
              style={{ 
                left: `${Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100))}%`,
                top: "50%"
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="w-3 h-3 text-primary" />
              </div>
            </div>
            
            {/* BMI category zones */}
            <div className="flex h-full rounded-full overflow-hidden">
              <div className="w-[18%] bg-blue-500"></div>
              <div className="w-[32%] bg-green-500"></div>
              <div className="w-[25%] bg-amber-500"></div>
              <div className="w-[25%] bg-red-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
