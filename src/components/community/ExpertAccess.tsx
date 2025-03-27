
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  UtensilsCrossed, 
  Calendar, 
  Star, 
  Clock, 
  Video, 
  MessageSquare,
  Search,
  Filter,
  Shield 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

// Sample data for experts
const experts = [
  {
    id: 1,
    name: "Dr. Emily Wilson",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    specialty: "nutritionist",
    title: "Registered Dietitian, PhD",
    bio: "Specializing in weight management and sports nutrition with 10+ years of experience helping clients achieve their goals through personalized nutrition plans.",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85,
    availability: ["Mon", "Wed", "Fri"],
    badges: ["Certified", "Featured"]
  },
  {
    id: 2,
    name: "Mark Johnson",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    specialty: "trainer",
    title: "Certified Personal Trainer",
    bio: "Former professional athlete with expertise in strength training, HIIT, and rehabilitation. Passionate about helping clients build sustainable fitness habits.",
    rating: 4.8,
    reviews: 98,
    hourlyRate: 75,
    availability: ["Tue", "Thu", "Sat"],
    badges: ["Certified"]
  },
  {
    id: 3,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b",
    specialty: "nutritionist",
    title: "Clinical Nutritionist, MS",
    bio: "Specializing in plant-based nutrition and gut health. I help clients optimize their diet for better performance, energy, and overall wellbeing.",
    rating: 4.7,
    reviews: 64,
    hourlyRate: 70,
    availability: ["Mon", "Tue", "Thu"],
    badges: ["Certified"]
  },
  {
    id: 4,
    name: "James Rodriguez",
    avatar: "https://images.unsplash.com/photo-1618077360395-f3068be8e001",
    specialty: "trainer",
    title: "NASM Certified Trainer",
    bio: "Specialized in bodybuilding, powerlifting, and body transformation. I create customized workout plans tailored to your specific goals and needs.",
    rating: 4.9,
    reviews: 152,
    hourlyRate: 90,
    availability: ["Wed", "Fri", "Sat", "Sun"],
    badges: ["Certified", "Featured"]
  }
];

const ExpertAccess = () => {
  const handleBookConsultation = (expertId: number) => {
    toast.success("Consultation request sent! We'll confirm the booking shortly.");
  };
  
  const handleSearchExperts = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter the experts based on search criteria
  };

  return (
    <div className="space-y-6">
      {/* Hero section */}
      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Expert Guidance, Personalized for You</h2>
              <p className="text-muted-foreground mb-4">
                Connect with certified nutritionists and personal trainers for one-on-one consultations to accelerate your fitness journey.
              </p>
              <div className="flex items-center space-x-2 text-sm mb-6">
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-1 text-primary" />
                  <span>Video Sessions</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1 text-primary" />
                  <span>Chat Support</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-primary" />
                  <span>Verified Experts</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Find an Expert</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Find Your Perfect Expert</DialogTitle>
                      <DialogDescription>
                        Tell us what you're looking for to match with the right professional.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSearchExperts} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expert Type</label>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="nutritionist">Nutritionist</SelectItem>
                            <SelectItem value="trainer">Personal Trainer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Specialty Focus</label>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue placeholder="Select focus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="weight-loss">Weight Loss</SelectItem>
                            <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                            <SelectItem value="sports">Sports Performance</SelectItem>
                            <SelectItem value="plant-based">Plant-Based Nutrition</SelectItem>
                            <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Budget (per session)</label>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue placeholder="Select price range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="50-75">$50-$75</SelectItem>
                            <SelectItem value="75-100">$75-$100</SelectItem>
                            <SelectItem value="100+">$100+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </form>
                    <DialogFooter>
                      <Button onClick={() => toast.success("Search criteria saved!")}>
                        <Search className="h-4 w-4 mr-2" />
                        Search Experts
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline">How It Works</Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" 
                alt="Expert consultation" 
                className="rounded-lg max-w-full h-auto shadow-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Expert categories */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Experts</TabsTrigger>
            <TabsTrigger value="nutritionist">Nutritionists</TabsTrigger>
            <TabsTrigger value="trainer">Personal Trainers</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Search experts..." 
              className="w-[200px]"
            />
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts.map((expert) => (
              <ExpertCard 
                key={expert.id} 
                expert={expert} 
                onBookConsultation={handleBookConsultation}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="nutritionist" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts
              .filter(expert => expert.specialty === "nutritionist")
              .map((expert) => (
                <ExpertCard 
                  key={expert.id} 
                  expert={expert} 
                  onBookConsultation={handleBookConsultation}
                />
              ))
            }
          </div>
        </TabsContent>
        
        <TabsContent value="trainer" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts
              .filter(expert => expert.specialty === "trainer")
              .map((expert) => (
                <ExpertCard 
                  key={expert.id} 
                  expert={expert} 
                  onBookConsultation={handleBookConsultation}
                />
              ))
            }
          </div>
        </TabsContent>
      </Tabs>
      
      {/* How it works section */}
      <Card>
        <CardHeader>
          <CardTitle>How Expert Consultations Work</CardTitle>
          <CardDescription>
            We've made it easy to get professional guidance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">1. Find Your Expert</h3>
              <p className="text-sm text-muted-foreground">Browse profiles and choose an expert that matches your needs and goals.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">2. Book a Session</h3>
              <p className="text-sm text-muted-foreground">Schedule a convenient time for a video consultation or messaging support.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">3. Get Personalized Guidance</h3>
              <p className="text-sm text-muted-foreground">Receive customized advice and plans tailored to your specific fitness journey.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Expert card component
interface ExpertCardProps {
  expert: {
    id: number;
    name: string;
    avatar: string;
    specialty: string;
    title: string;
    bio: string;
    rating: number;
    reviews: number;
    hourlyRate: number;
    availability: string[];
    badges: string[];
  };
  onBookConsultation: (expertId: number) => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onBookConsultation }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={expert.avatar} />
              <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{expert.name}</CardTitle>
              <div className="text-sm text-muted-foreground">{expert.title}</div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium ml-1">{expert.rating}</span>
                <span className="text-xs text-muted-foreground ml-1">({expert.reviews} reviews)</span>
              </div>
            </div>
          </div>
          {expert.specialty === "nutritionist" ? (
            <UtensilsCrossed className="h-5 w-5 text-primary" />
          ) : (
            <Dumbbell className="h-5 w-5 text-primary" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {expert.badges.map((badge, index) => (
            <Badge key={index} variant={badge === "Featured" ? "default" : "outline"}>
              {badge}
            </Badge>
          ))}
        </div>
        <p className="text-sm mb-4">{expert.bio}</p>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>${expert.hourlyRate}/hour</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-muted-foreground">Available:</span>
            {expert.availability.map((day, index) => (
              <span key={index} className="text-xs px-1.5 py-0.5 bg-muted rounded">{day}</span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Book Consultation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a Session with {expert.name}</DialogTitle>
              <DialogDescription>
                Select a date and time for your consultation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Type</label>
                <Select defaultValue="video">
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call (30 min)</SelectItem>
                    <SelectItem value="video-long">Video Call (60 min)</SelectItem>
                    <SelectItem value="chat">Chat Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time</label>
                <Select defaultValue="9:00">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Note to Expert (Optional)</label>
                <Input placeholder="Share your goals or any specific questions" />
              </div>
              <div className="flex items-center justify-between text-sm mt-6">
                <span>Consultation Fee:</span>
                <span className="font-bold">${expert.hourlyRate}</span>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => onBookConsultation(expert.id)}>
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ExpertAccess;
