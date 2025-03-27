
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ProfileForm from "@/components/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isOnboarding, setIsOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">{isOnboarding ? "Complete Your Profile" : "Your Profile"}</h1>
        </div>

        {isOnboarding ? (
          <ProfileForm isOnboarding={true} onComplete={() => setIsOnboarding(false)} />
        ) : (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <ProfileForm isOnboarding={false} />
            </TabsContent>
            
            <TabsContent value="preferences">
              <ProfileForm isOnboarding={false} section="preferences" />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Profile;
