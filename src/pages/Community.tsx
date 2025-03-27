
import React from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WearableSync from "@/components/community/WearableSync";
import SocialFeed from "@/components/community/SocialFeed";
import ExpertAccess from "@/components/community/ExpertAccess";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Integration & Community</h1>
        
        <Tabs defaultValue="wearables" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="wearables">Wearable Sync</TabsTrigger>
            <TabsTrigger value="social">Social Feed</TabsTrigger>
            <TabsTrigger value="experts">Expert Access</TabsTrigger>
          </TabsList>
          
          <TabsContent value="wearables">
            <WearableSync />
          </TabsContent>
          
          <TabsContent value="social">
            <SocialFeed />
          </TabsContent>
          
          <TabsContent value="experts">
            <ExpertAccess />
          </TabsContent>
        </Tabs>
        
        {/* Footer content */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>FitLife Coach — Connect, share, and grow with our community</p>
        </div>
      </div>
    </div>
  );
};

export default Community;
