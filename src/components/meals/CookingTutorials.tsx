
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
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Filter, 
  Play, 
  Search 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Mock tutorial data
const tutorials = [
  {
    id: 1,
    title: "Perfect Protein Pancakes",
    thumbnail: "https://images.unsplash.com/photo-1575853121743-60c24f0a7502",
    duration: "6:42",
    difficulty: "beginner",
    category: "breakfast",
    isSaved: false
  },
  {
    id: 2,
    title: "Quick Salmon Meal Prep",
    thumbnail: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    duration: "8:15",
    difficulty: "intermediate",
    category: "lunch",
    isSaved: true
  },
  {
    id: 3,
    title: "High-Protein Vegetarian Bowl",
    thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    duration: "5:30",
    difficulty: "beginner",
    category: "dinner",
    isSaved: false
  },
  {
    id: 4,
    title: "Overnight Oats 5 Ways",
    thumbnail: "https://images.unsplash.com/photo-1626078299034-94114e9abdf7",
    duration: "7:20",
    difficulty: "beginner",
    category: "breakfast",
    isSaved: false
  },
  {
    id: 5,
    title: "Healthy Smoothie Recipes",
    thumbnail: "https://images.unsplash.com/photo-1553530666-ba11a7da3888",
    duration: "4:45",
    difficulty: "beginner",
    category: "snacks",
    isSaved: true
  },
  {
    id: 6,
    title: "Keto-Friendly Dinner Ideas",
    thumbnail: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327",
    duration: "9:12",
    difficulty: "advanced",
    category: "dinner",
    isSaved: false
  }
];

const CookingTutorials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [savedTutorials, setSavedTutorials] = useState(
    tutorials.filter(tutorial => tutorial.isSaved).map(tutorial => tutorial.id)
  );
  
  const handleSaveTutorial = (id: number) => {
    if (savedTutorials.includes(id)) {
      setSavedTutorials(savedTutorials.filter(tutorialId => tutorialId !== id));
    } else {
      setSavedTutorials([...savedTutorials, id]);
    }
  };
  
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || tutorial.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "all" || tutorial.category === categoryFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tutorials..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select 
                value={difficultyFilter} 
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select 
                value={categoryFilter} 
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="overflow-hidden">
              <div className="relative">
                <div 
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${tutorial.thumbnail})` }}
                >
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="bg-background/80 backdrop-blur-sm rounded-full"
                    onClick={() => handleSaveTutorial(tutorial.id)}
                  >
                    <Bookmark 
                      className="h-5 w-5" 
                      fill={savedTutorials.includes(tutorial.id) ? "currentColor" : "none"}
                    />
                  </Button>
                </div>
                <Badge 
                  variant="secondary" 
                  className="absolute bottom-2 right-2 flex items-center bg-background/80 backdrop-blur-sm"
                >
                  <Clock className="mr-1 h-3 w-3" />
                  {tutorial.duration}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-1">{tutorial.title}</h3>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {tutorial.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground capitalize">
                    {tutorial.difficulty}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No tutorials match your search criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("all");
                setCategoryFilter("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CookingTutorials;
