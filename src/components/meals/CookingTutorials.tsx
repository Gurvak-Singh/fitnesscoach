
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChefHat, 
  Clock, 
  PlayCircle, 
  Bookmark, 
  Search,
  CheckCircle, 
  Star,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock tutorial data
const mockTutorials = [
  {
    id: 1,
    title: "Perfect Protein Pancakes",
    description: "Learn how to make fluffy protein pancakes with the perfect texture.",
    thumbnail: "https://images.unsplash.com/photo-1612182062633-9ff3b3598e96",
    duration: "4:35",
    difficulty: "beginner",
    category: "breakfast",
    saved: false,
    completed: false,
    instructor: "Chef Maria",
    rating: 4.8
  },
  {
    id: 2,
    title: "Grilled Chicken Meal Prep",
    description: "Master the art of meal prepping with this simple grilled chicken recipe.",
    thumbnail: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8",
    duration: "8:12",
    difficulty: "intermediate",
    category: "meal-prep",
    saved: true,
    completed: false,
    instructor: "Chef Michael",
    rating: 4.6
  },
  {
    id: 3,
    title: "Salmon Cooking Techniques",
    description: "Learn three different ways to cook salmon perfectly every time.",
    thumbnail: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    duration: "12:45",
    difficulty: "advanced",
    category: "dinner",
    saved: false,
    completed: true,
    instructor: "Chef Lisa",
    rating: 4.9
  },
  {
    id: 4,
    title: "Quick Healthy Stir-Fry",
    description: "Make a nutritious stir-fry in under 15 minutes with any vegetables.",
    thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    duration: "6:20",
    difficulty: "beginner",
    category: "dinner",
    saved: false,
    completed: false,
    instructor: "Chef David",
    rating: 4.7
  },
  {
    id: 5,
    title: "Protein-Packed Smoothie Bowl",
    description: "Create Instagram-worthy smoothie bowls that are nutritious and delicious.",
    thumbnail: "https://images.unsplash.com/photo-1590301157890-4810ed352733",
    duration: "5:15",
    difficulty: "beginner",
    category: "breakfast",
    saved: true,
    completed: true,
    instructor: "Chef Sarah",
    rating: 4.5
  },
  {
    id: 6,
    title: "Baked Salmon with Herbs",
    description: "A foolproof method for perfectly baked salmon with fresh herbs.",
    thumbnail: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    duration: "7:30",
    difficulty: "intermediate",
    category: "dinner",
    saved: false,
    completed: false,
    instructor: "Chef Thomas",
    rating: 4.8
  }
];

const CookingTutorials = () => {
  const [tutorials, setTutorials] = useState(mockTutorials);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !difficultyFilter || tutorial.difficulty === difficultyFilter;
    const matchesCategory = !categoryFilter || tutorial.category === categoryFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });
  
  const toggleSaved = (id: number) => {
    setTutorials(prev => 
      prev.map(tutorial => 
        tutorial.id === id 
          ? { ...tutorial, saved: !tutorial.saved }
          : tutorial
      )
    );
    
    const tutorial = tutorials.find(t => t.id === id);
    if (tutorial) {
      toast.success(tutorial.saved 
        ? `"${tutorial.title}" removed from saved tutorials` 
        : `"${tutorial.title}" saved for later`
      );
    }
  };
  
  const markCompleted = (id: number) => {
    setTutorials(prev => 
      prev.map(tutorial => 
        tutorial.id === id 
          ? { ...tutorial, completed: !tutorial.completed }
          : tutorial
      )
    );
    
    const tutorial = tutorials.find(t => t.id === id);
    if (tutorial) {
      toast.success(tutorial.completed 
        ? `"${tutorial.title}" marked as not completed` 
        : `"${tutorial.title}" marked as completed!`
      );
    }
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter(null);
    setCategoryFilter(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <ChefHat className="mr-2 h-5 w-5" />
                Cooking Tutorials
              </CardTitle>
              <CardDescription>
                Master cooking techniques with video guides
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Badge variant="outline" className="flex items-center">
                <CheckCircle className="mr-1 h-3 w-3" />
                {tutorials.filter(t => t.completed).length} Completed
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <Bookmark className="mr-1 h-3 w-3" />
                {tutorials.filter(t => t.saved).length} Saved
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and filter */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tutorials..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select 
                value={difficultyFilter || ""}
                onValueChange={(value) => setDifficultyFilter(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Difficulties</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select 
                value={categoryFilter || ""}
                onValueChange={(value) => setCategoryFilter(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="meal-prep">Meal Prep</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Filter active indicators */}
          {(searchQuery || difficultyFilter || categoryFilter) && (
            <div className="flex items-center justify-between bg-secondary/40 p-2 rounded-md">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters active:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="text-xs">
                    Search: {searchQuery}
                  </Badge>
                )}
                {difficultyFilter && (
                  <Badge variant="secondary" className="text-xs capitalize">
                    {difficultyFilter}
                  </Badge>
                )}
                {categoryFilter && (
                  <Badge variant="secondary" className="text-xs capitalize">
                    {categoryFilter.replace('-', ' ')}
                  </Badge>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </div>
          )}
          
          {/* Tutorials grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.length > 0 ? (
              filteredTutorials.map(tutorial => (
                <Card key={tutorial.id} className="overflow-hidden hover-scale">
                  <div className="relative">
                    <div 
                      className="w-full h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${tutorial.thumbnail})` }}
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {tutorial.completed && (
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                      {tutorial.saved && (
                        <div className="bg-secondary text-secondary-foreground rounded-full p-1">
                          <Bookmark className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {tutorial.duration}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="default" 
                          size="icon"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <PlayCircle className="h-6 w-6" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{tutorial.title}</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video bg-muted flex items-center justify-center relative">
                          <div 
                            className="w-full h-full bg-cover bg-center opacity-60"
                            style={{ backgroundImage: `url(${tutorial.thumbnail})` }}
                          />
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-lg font-medium mb-4">Video Tutorial</p>
                            <p className="text-sm text-muted-foreground mb-8">
                              In a real app, a video player would be embedded here
                            </p>
                            <Button>
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Play Video
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Instructor</p>
                            <p className="font-medium">{tutorial.instructor}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Difficulty</p>
                            <p className="font-medium capitalize">{tutorial.difficulty}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Rating</p>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-primary fill-primary mr-1" />
                              <span className="font-medium">{tutorial.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button 
                            variant="outline"
                            onClick={() => toggleSaved(tutorial.id)}
                          >
                            <Bookmark className="mr-2 h-4 w-4" filled={tutorial.saved} />
                            {tutorial.saved ? "Saved" : "Save for Later"}
                          </Button>
                          <Button 
                            onClick={() => markCompleted(tutorial.id)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            {tutorial.completed ? "Mark as Not Completed" : "Mark as Completed"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-1 mb-2">
                      <CardTitle className="text-base">{tutorial.title}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {tutorial.description}
                      </CardDescription>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {tutorial.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {tutorial.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-primary fill-primary mr-1" />
                        <span className="text-xs font-medium">{tutorial.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="p-4 flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => toggleSaved(tutorial.id)}
                    >
                      <Bookmark 
                        className={`h-4 w-4 mr-1 ${tutorial.saved ? "fill-primary" : ""}`} 
                      />
                      {tutorial.saved ? "Saved" : "Save"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => markCompleted(tutorial.id)}
                    >
                      <CheckCircle 
                        className={`h-4 w-4 mr-1 ${tutorial.completed ? "text-primary" : ""}`} 
                      />
                      {tutorial.completed ? "Completed" : "Mark Done"}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No tutorials found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search or filters
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Browse All Categories</Button>
          <Button>Suggest a Tutorial</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CookingTutorials;
