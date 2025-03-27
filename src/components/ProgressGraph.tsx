
import React from "react";
import { TrendingUp, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressGraphProps {
  className?: string;
}

const ProgressGraph: React.FC<ProgressGraphProps> = ({ className }) => {
  // Mock data - in a real app, this would be actual progress data
  const weeklyData = [65, 59, 80, 81, 56, 55, 70];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Find max value for scaling
  const maxValue = Math.max(...weeklyData);

  return (
    <div className={cn("glass-card rounded-2xl p-6 animate-fade-in", className)}>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          <BarChart className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Weekly Progress</h2>
      </div>

      <div className="mt-6 h-40">
        <div className="flex h-full items-end justify-between">
          {weeklyData.map((value, index) => {
            const heightPercentage = (value / maxValue) * 100;
            const isToday = index === 6; // Assuming Sunday is today

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative w-full flex justify-center mb-2">
                  <div
                    className={cn(
                      "w-4/5 rounded-t-md transition-all duration-500",
                      isToday ? "bg-primary" : "bg-primary/40"
                    )}
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                  
                  {isToday && (
                    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-primary text-white text-xs rounded-md">
                      <div className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <span>Today</span>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-primary"></div>
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-muted-foreground">{days[index]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground">This week</p>
            <p className="text-lg font-semibold">466 <span className="text-sm font-normal text-muted-foreground">points</span></p>
          </div>
          <div className="p-3 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground">Weekly goal</p>
            <div className="flex items-end">
              <p className="text-lg font-semibold">600</p>
              <div className="ml-2 w-16 h-3 bg-primary/20 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: "77%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressGraph;
