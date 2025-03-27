
import React from "react";
import { 
  Card, CardContent, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart3, Activity, Calendar, ArrowUpRight, Dumbbell } from "lucide-react";
import {
  LineChart as ReLineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const WorkoutHistory: React.FC = () => {
  // Mock data for charts
  const performanceData = [
    { name: "Week 1", weight: 135, reps: 8, volume: 1080 },
    { name: "Week 2", weight: 145, reps: 8, volume: 1160 },
    { name: "Week 3", weight: 145, reps: 10, volume: 1450 },
    { name: "Week 4", weight: 155, reps: 8, volume: 1240 },
    { name: "Week 5", weight: 160, reps: 8, volume: 1280 },
    { name: "Week 6", weight: 165, reps: 9, volume: 1485 },
    { name: "Week 7", weight: 175, reps: 8, volume: 1400 },
    { name: "Week 8", weight: 180, reps: 8, volume: 1440 },
  ];

  const workoutFrequencyData = [
    { name: "Mon", workouts: 1 },
    { name: "Tue", workouts: 0 },
    { name: "Wed", workouts: 1 },
    { name: "Thu", workouts: 0 },
    { name: "Fri", workouts: 1 },
    { name: "Sat", workouts: 0 },
    { name: "Sun", workouts: 1 },
  ];

  // Recent workouts data
  const recentWorkouts = [
    { 
      date: "Today", 
      name: "Upper Body Strength", 
      duration: "45 min", 
      exercises: 6,
      performance: "improved"
    },
    { 
      date: "Yesterday", 
      name: "Cardio Session", 
      duration: "30 min", 
      exercises: 4,
      performance: "maintained"
    },
    { 
      date: "2 days ago", 
      name: "Lower Body", 
      duration: "50 min", 
      exercises: 7,
      performance: "improved"
    },
    { 
      date: "3 days ago", 
      name: "Core & Abs", 
      duration: "25 min", 
      exercises: 5,
      performance: "improved"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Dumbbell className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">5 days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Activity className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Workout Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">38 min</div>
                <p className="text-xs text-muted-foreground">Per session</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progress Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-muted-foreground">From last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="performance" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="frequency" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Frequency
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Strength Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart
                    data={performanceData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (lbs)" />
                    <Line yAxisId="right" type="monotone" dataKey="volume" stroke="#82ca9d" name="Volume (weight × reps)" />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">View All Exercises</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Workout Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={workoutFrequencyData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="workouts" fill="#8884d8" name="Workouts" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-md">
                  <span className="text-sm text-muted-foreground">Current Week</span>
                  <span className="font-bold">4 workouts</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-md">
                  <span className="text-sm text-muted-foreground">Last Week</span>
                  <span className="font-bold">5 workouts</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-md">
                  <span className="text-sm text-muted-foreground">Average</span>
                  <span className="font-bold">4.2 / week</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWorkouts.map((workout, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{workout.name}</h4>
                        <div className="flex text-sm text-muted-foreground">
                          <span>{workout.date}</span>
                          <span className="mx-2">•</span>
                          <span>{workout.duration}</span>
                          <span className="mx-2">•</span>
                          <span>{workout.exercises} exercises</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {workout.performance === "improved" ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          Improved
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                          Maintained
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button variant="outline">View All Workouts</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutHistory;
