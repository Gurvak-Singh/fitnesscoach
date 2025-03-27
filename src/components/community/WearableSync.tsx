
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Watch, Heart, Footprints, Flame, Plus, RefreshCw, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const WearableSync = () => {
  const [syncedDevices, setSyncedDevices] = useState([
    { id: 1, name: "Fitbit Charge 5", type: "fitness-tracker", lastSync: "2 hours ago", connected: true },
  ]);
  
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncing, setSyncing] = useState(false);
  
  const handleSync = (deviceId: number) => {
    setSyncing(true);
    setSyncProgress(0);
    
    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncing(false);
          toast.success("Device synchronized successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const handleConnect = () => {
    // Simulate connecting to a new device
    toast.success("Apple Watch connected successfully!");
    
    setSyncedDevices([
      ...syncedDevices,
      { 
        id: syncedDevices.length + 1, 
        name: "Apple Watch SE", 
        type: "smartwatch", 
        lastSync: "Just now", 
        connected: true 
      }
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health metrics card */}
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Health Metrics
            </CardTitle>
            <CardDescription>
              Data imported from your connected devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <Heart className="h-10 w-10 text-red-500 mr-4" />
                    <div>
                      <div className="text-sm text-muted-foreground">Avg. Heart Rate</div>
                      <div className="text-2xl font-bold">72 BPM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-lg">
                    <Footprints className="h-10 w-10 text-blue-500 mr-4" />
                    <div>
                      <div className="text-sm text-muted-foreground">Steps</div>
                      <div className="text-2xl font-bold">8,243</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-lg">
                    <Flame className="h-10 w-10 text-orange-500 mr-4" />
                    <div>
                      <div className="text-sm text-muted-foreground">Calories Burned</div>
                      <div className="text-2xl font-bold">1,876 kcal</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="week" className="pt-4">
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">Weekly health data visualization will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="month" className="pt-4">
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">Monthly health data visualization will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Connected devices */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Watch className="mr-2 h-5 w-5 text-primary" />
              Connected Devices
            </CardTitle>
            <CardDescription>
              Manage your wearable devices and tracking apps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {syncedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Watch className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-muted-foreground">Last synced: {device.lastSync}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="capitalize">
                    {device.connected ? "Connected" : "Disconnected"}
                  </Badge>
                  <Button size="sm" onClick={() => handleSync(device.id)} disabled={syncing}>
                    {syncing ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
            
            {syncing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Syncing data...</span>
                  <span>{syncProgress}%</span>
                </div>
                <Progress value={syncProgress} />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleConnect} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Connect New Device
            </Button>
          </CardFooter>
        </Card>
        
        {/* Compatible devices */}
        <Card>
          <CardHeader>
            <CardTitle>Compatible Devices</CardTitle>
            <CardDescription>
              Devices and apps that work with FitLife
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-2 border rounded flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Fitbit
            </div>
            <div className="p-2 border rounded flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Apple Watch
            </div>
            <div className="p-2 border rounded flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Garmin
            </div>
            <div className="p-2 border rounded flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Samsung Health
            </div>
            <div className="p-2 border rounded flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Google Fit
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WearableSync;
