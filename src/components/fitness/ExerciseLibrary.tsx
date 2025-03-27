import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Play, Dumbbell, Filter } from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  id: number;
  name: string;
  muscle: string;
  equipment: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  videoUrl?: string;
  imageUrl: string;
}

const ExerciseLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [muscleFilter, setMuscleFilter] = useState("all");
  const [equipmentFilter, setEquipmentFilter] = useState("all");
  
  // Mock exercise data
  const exercises: Exercise[] = [
    {
      id: 1,
      name: "Barbell Bench Press",
      muscle: "chest",
      equipment: "barbell",
      difficulty: "intermediate",
      description: "The barbell bench press is a classic exercise that targets your chest, shoulders, and triceps. Lie on a flat bench, lower the bar to your chest, then press upward to full arm extension.",
      imageUrl: "/placeholder.svg",
      videoUrl: "#demo-video"
    },
    {
      id: 2,
      name: "Dumbbell Shoulder Press",
      muscle: "shoulders",
      equipment: "dumbbell",
      difficulty: "intermediate",
      description: "The dumbbell shoulder press strengthens your shoulders and triceps. Sit on a bench with back support, hold dumbbells at shoulder level, and press them upward until your arms are fully extended.",
      imageUrl: "/placeholder.svg",
      videoUrl: "#demo-video"
    },
    {
      id: 3,
      name: "Bodyweight Squat",
      muscle: "legs",
      equipment: "none",
      difficulty: "beginner",
      description: "The bodyweight squat is a foundational lower body exercise. Stand with feet shoulder-width apart, bend your knees and lower your hips as if sitting in a chair, then return to standing.",
      imageUrl: "/placeholder.svg",
      videoUrl: "#demo-video"
    },
    {
      id: 4,
      name: "Pull-up",
      muscle: "back",
      equipment: "pull-up bar",
      difficulty: "intermediate",
      description: "The pull-up is an excellent back and bicep exercise. Hang from a bar with palms facing away, then pull yourself up until your chin is over the bar.",
      imageUrl: "/placeholder.svg",
      videoUrl: "#demo-video"
    },
    {
      id: 5,
      name: "Plank",
      muscle: "core",
      equipment: "none",
      difficulty: "beginner",
      description: "The plank is a core-strengthening exercise. Hold a push-up position with your weight on your forearms, keeping your body in a straight line from head to heels.",
      imageUrl: "/placeholder.svg",
      videoUrl: "#demo-video"
    },
    {
      id: 6,
      name: "Deadlift",
      muscle: "back",
      equipment: "barbell",
      difficulty: "advanced",
      description: "The deadlift is a compound exercise that works your back, glutes, and hamstrings. With feet hip-width apart, bend at hips and knees to lower and grab the bar, then stand up straight while holding the bar.",
      imageUrl: "/placeholder.svg",
      videoUrl: "#demo-video"
    },
  ];
  
  // Filter exercises based on search query and filters
  const filteredExercises = exercises.filter(exercise => {
    // Search filter
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exercise.muscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
                          
    // Muscle filter
    const matchesMuscle = muscleFilter === "all" || exercise.muscle === muscleFilter;
    
    // Equipment filter
    const matchesEquipment = equipmentFilter === "all" || exercise.equipment === equipmentFilter;
    
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  return (
    <div className="space-y-6">
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Dumbbell className="mr-2 h-5 w-5 text-primary" />
            Exercise Library
          </CardTitle>
          <CardDescription>
            Video demonstrations of exercises with proper form and technique guidance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exercises, muscles, or equipment..."
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={muscleFilter} onValueChange={setMuscleFilter}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Muscle</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Muscles</SelectItem>
                  <SelectItem value="chest">Chest</SelectItem>
                  <SelectItem value="back">Back</SelectItem>
                  <SelectItem value="shoulders">Shoulders</SelectItem>
                  <SelectItem value="arms">Arms</SelectItem>
                  <SelectItem value="legs">Legs</SelectItem>
                  <SelectItem value="core">Core</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Equipment</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Equipment</SelectItem>
                  <SelectItem value="none">Bodyweight</SelectItem>
                  <SelectItem value="dumbbell">Dumbbells</SelectItem>
                  <SelectItem value="barbell">Barbell</SelectItem>
                  <SelectItem value="pull-up bar">Pull-up Bar</SelectItem>
                  <SelectItem value="kettlebell">Kettlebell</SelectItem>
                  <SelectItem value="resistance band">Resistance Band</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="chest">Chest</TabsTrigger>
          <TabsTrigger value="back">Back</TabsTrigger>
          <TabsTrigger value="legs">Legs</TabsTrigger>
          <TabsTrigger value="shoulders">Shoulders</TabsTrigger>
          <TabsTrigger value="core">Core</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.length > 0 ? (
              filteredExercises.map(exercise => (
                <Dialog key={exercise.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover-scale">
                      <CardHeader className="p-4">
                        <div className="aspect-video bg-primary/10 rounded-md flex items-center justify-center mb-2">
                          <img 
                            src={exercise.imageUrl} 
                            alt={exercise.name}
                            className="max-h-full rounded-md"
                          />
                          <div className="absolute">
                            <div className="h-12 w-12 rounded-full bg-primary/80 flex items-center justify-center text-white">
                              <Play className="h-6 w-6" />
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="capitalize">{exercise.muscle}</Badge>
                          <Badge variant="outline" className="capitalize">{exercise.equipment}</Badge>
                          <Badge 
                            className={
                              exercise.difficulty === "beginner" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                              exercise.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                              "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {exercise.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{exercise.name}</DialogTitle>
                      <DialogDescription>
                        Video demonstration and proper form guidance
                      </DialogDescription>
                    </DialogHeader>
                    <div className="aspect-video bg-primary/10 rounded-md mb-4 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={exercise.imageUrl} 
                          alt={exercise.name}
                          className="max-h-full rounded-md"
                        />
                        <div className="absolute">
                          <div className="h-20 w-20 rounded-full bg-primary/80 flex items-center justify-center text-white cursor-pointer">
                            <Play className="h-10 w-10" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center py-2 bg-secondary/30 rounded-md">
                        <h4 className="text-sm font-semibold text-muted-foreground">Target</h4>
                        <p className="capitalize">{exercise.muscle}</p>
                      </div>
                      <div className="text-center py-2 bg-secondary/30 rounded-md">
                        <h4 className="text-sm font-semibold text-muted-foreground">Equipment</h4>
                        <p className="capitalize">{exercise.equipment}</p>
                      </div>
                      <div className="text-center py-2 bg-secondary/30 rounded-md">
                        <h4 className="text-sm font-semibold text-muted-foreground">Level</h4>
                        <p className="capitalize">{exercise.difficulty}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Instructions</h3>
                      <p className="text-muted-foreground">{exercise.description}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Form Tips</h3>
                      <ul className="list-disc pl-5 text-muted-foreground">
                        <li>Maintain proper posture throughout the movement</li>
                        <li>Focus on controlled movement rather than speed</li>
                        <li>Breathe out during the exertion phase</li>
                        <li>Keep movements smooth and avoid jerking</li>
                      </ul>
                    </div>
                    <div className="flex justify-end">
                      <Button>Add to Workout</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                <Dumbbell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <h3 className="text-lg font-medium">No exercises found</h3>
                <p>Try changing your search criteria or filters</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Other tab contents will filter by muscle group */}
        {["chest", "back", "legs", "shoulders", "core"].map(muscle => (
          <TabsContent key={muscle} value={muscle} className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises
                .filter(ex => ex.muscle === muscle)
                .map(exercise => (
                  <Dialog key={exercise.id}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover-scale">
                        <CardHeader className="p-4">
                          <div className="aspect-video bg-primary/10 rounded-md flex items-center justify-center mb-2">
                            <img 
                              src={exercise.imageUrl} 
                              alt={exercise.name}
                              className="max-h-full rounded-md"
                            />
                            <div className="absolute">
                              <div className="h-12 w-12 rounded-full bg-primary/80 flex items-center justify-center text-white">
                                <Play className="h-6 w-6" />
                              </div>
                            </div>
                          </div>
                          <CardTitle className="text-lg">{exercise.name}</CardTitle>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="capitalize">{exercise.muscle}</Badge>
                            <Badge variant="outline" className="capitalize">{exercise.equipment}</Badge>
                            <Badge 
                              className={
                                exercise.difficulty === "beginner" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                                exercise.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                                "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {exercise.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{exercise.name}</DialogTitle>
                        <DialogDescription>
                          Video demonstration and proper form guidance
                        </DialogDescription>
                      </DialogHeader>
                      <div className="aspect-video bg-primary/10 rounded-md mb-4 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <img 
                            src={exercise.imageUrl} 
                            alt={exercise.name}
                            className="max-h-full rounded-md"
                          />
                          <div className="absolute">
                            <div className="h-20 w-20 rounded-full bg-primary/80 flex items-center justify-center text-white cursor-pointer">
                              <Play className="h-10 w-10" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center py-2 bg-secondary/30 rounded-md">
                          <h4 className="text-sm font-semibold text-muted-foreground">Target</h4>
                          <p className="capitalize">{exercise.muscle}</p>
                        </div>
                        <div className="text-center py-2 bg-secondary/30 rounded-md">
                          <h4 className="text-sm font-semibold text-muted-foreground">Equipment</h4>
                          <p className="capitalize">{exercise.equipment}</p>
                        </div>
                        <div className="text-center py-2 bg-secondary/30 rounded-md">
                          <h4 className="text-sm font-semibold text-muted-foreground">Level</h4>
                          <p className="capitalize">{exercise.difficulty}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Instructions</h3>
                        <p className="text-muted-foreground">{exercise.description}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Form Tips</h3>
                        <ul className="list-disc pl-5 text-muted-foreground">
                          <li>Maintain proper posture throughout the movement</li>
                          <li>Focus on controlled movement rather than speed</li>
                          <li>Breathe out during the exertion phase</li>
                          <li>Keep movements smooth and avoid jerking</li>
                        </ul>
                      </div>
                      <div className="flex justify-end">
                        <Button>Add to Workout</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExerciseLibrary;
