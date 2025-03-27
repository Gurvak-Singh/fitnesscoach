
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Award, Users, Flame, Filter, Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for posts
const initialPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      handle: "@sarahfit"
    },
    content: "Just completed my first 10K run! So proud of my progress over the last 3 months. #RunningGoals",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571",
    timestamp: "2 hours ago",
    likes: 28,
    comments: 5,
    shares: 2,
    type: "achievement"
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      handle: "@mikefit"
    },
    content: "Loving this high-protein smoothie bowl recipe! Perfect post-workout fuel with 30g of protein. Here's the recipe: 1 banana, 1 cup berries, 1 scoop protein powder, 1/2 cup Greek yogurt, topped with granola and chia seeds.",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 12,
    shares: 8,
    type: "recipe"
  },
  {
    id: 3,
    user: {
      name: "FitLife Trainers",
      avatar: "",
      handle: "@fitlifecoach"
    },
    content: "New 30-day ab challenge starting next week! Join our community of over 500 participants and transform your core strength. Sign up through the link in our profile.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    timestamp: "1 day ago",
    likes: 112,
    comments: 24,
    shares: 36,
    type: "challenge"
  }
];

// Sample data for challenges
const challenges = [
  {
    id: 1,
    title: "30-Day Ab Challenge",
    description: "Daily core exercises for a stronger midsection",
    participants: 537,
    duration: "30 days",
    startDate: "May 15, 2023",
    difficulty: "Intermediate"
  },
  {
    id: 2,
    title: "10K Steps Daily",
    description: "Reach 10,000 steps every day for 3 weeks",
    participants: 1243,
    duration: "21 days",
    startDate: "May 10, 2023",
    difficulty: "Beginner"
  },
  {
    id: 3,
    title: "Plant-Based Week",
    description: "Try plant-based eating for a full week",
    participants: 325,
    duration: "7 days",
    startDate: "May 22, 2023",
    difficulty: "Beginner"
  }
];

const SocialFeed = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [activeFilter, setActiveFilter] = useState("all");
  const [newPostContent, setNewPostContent] = useState("");
  
  const handleLike = (postId: number) => {
    setPosts(posts.map((post) => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };
  
  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }
    
    const newPost = {
      id: posts.length + 1,
      user: {
        name: "Current User",
        avatar: "",
        handle: "@currentuser"
      },
      content: newPostContent,
      image: "",
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      type: "post"
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    toast.success("Post created successfully!");
  };
  
  const handleJoinChallenge = (challengeId: number) => {
    toast.success("You've joined the challenge!");
  };
  
  // Filter posts based on the active filter
  const filteredPosts = activeFilter === "all" 
    ? posts 
    : posts.filter(post => post.type === activeFilter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 space-y-6">
        {/* Create post card */}
        <Card>
          <CardHeader>
            <CardTitle>Share Your Journey</CardTitle>
            <CardDescription>
              Post your achievements, favorite recipes, or fitness tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="What's on your fitness mind?"
              className="min-h-[100px]"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <div className="flex items-center mt-4 space-x-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
              <Button variant="outline" size="sm">
                <Award className="h-4 w-4 mr-2" />
                Achievement
              </Button>
              <Button variant="outline" size="sm">
                <Flame className="h-4 w-4 mr-2" />
                Recipe
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreatePost}>Post Update</Button>
          </CardFooter>
        </Card>
        
        {/* Posts filter */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">Community Feed</div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Button 
              variant={activeFilter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={activeFilter === "achievement" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter("achievement")}
            >
              Achievements
            </Button>
            <Button 
              variant={activeFilter === "recipe" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter("recipe")}
            >
              Recipes
            </Button>
            <Button 
              variant={activeFilter === "challenge" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter("challenge")}
            >
              Challenges
            </Button>
          </div>
        </div>
        
        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{post.user.name}</div>
                        <div className="text-sm text-muted-foreground">{post.user.handle} • {post.timestamp}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {post.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="mb-3">{post.content}</p>
                  {post.image && (
                    <div className="rounded-md overflow-hidden mt-3">
                      <img src={post.image} alt="" className="w-full h-auto object-cover" />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center space-x-1"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">No posts found for this filter.</p>
              <Button variant="link" onClick={() => setActiveFilter("all")}>View all posts</Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Community stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Community Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Members</span>
              <span className="font-medium">12,458</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Challenges</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Posts Today</span>
              <span className="font-medium">127</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Active challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              Active Challenges
            </CardTitle>
            <CardDescription>Join challenges to stay motivated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="border rounded-lg p-3">
                <div className="font-medium">{challenge.title}</div>
                <div className="text-sm text-muted-foreground mb-2">{challenge.description}</div>
                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                  <span>{challenge.duration}</span>
                  <span>Starts: {challenge.startDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span className="text-xs">{challenge.participants} joined</span>
                  </div>
                  <Button size="sm" onClick={() => handleJoinChallenge(challenge.id)}>Join</Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Challenge
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Challenge</DialogTitle>
                  <DialogDescription>
                    Design a challenge to engage with the community.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Challenge Title</label>
                    <Input placeholder="Enter challenge title" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea placeholder="Describe your challenge" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration</label>
                      <Input placeholder="e.g., 30 days" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input type="date" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => toast.success("Challenge created!")}>Create Challenge</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        
        {/* Suggested connections */}
        <Card>
          <CardHeader>
            <CardTitle>Suggested Connections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">Runner, Weight Training</div>
                </div>
              </div>
              <Button size="sm" variant="outline">Follow</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Amy Taylor</div>
                  <div className="text-xs text-muted-foreground">Yoga, Nutrition Expert</div>
                </div>
              </div>
              <Button size="sm" variant="outline">Follow</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
                  <AvatarFallback>TK</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Tom Klein</div>
                  <div className="text-xs text-muted-foreground">Crossfit, Meal Prep</div>
                </div>
              </div>
              <Button size="sm" variant="outline">Follow</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialFeed;
