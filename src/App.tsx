
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./components/Dashboard";
import Profile from "./pages/Profile";
import Fitness from "./pages/Fitness";
import Meals from "./pages/Meals";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Create Auth Context for session management
import React from "react";

export const AuthContext = React.createContext({
  session: null,
  user: null,
  isLoading: true,
});

const queryClient = new QueryClient();

// Get the base path from the environment or use a default
const basePath = import.meta.env.BASE_URL || '/';

const App = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if this is a new sign-up
        if (event === 'SIGNED_IN') {
          // Check if user has a profile set up
          checkUserProfile(session?.user?.id);
        } else {
          setIsLoading(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Function to check if user has completed profile setup
  const checkUserProfile = async (userId) => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    
    try {
      // Check if user has a profile with metrics filled out
      const { data, error } = await supabase
        .from('profiles')
        .select('weight, height, fitness_goal, body_fat_percentage')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      // If profile doesn't exist or required fields are missing, mark as new user
      setIsNewUser(!data || 
        !data.weight || 
        !data.height || 
        !data.fitness_goal || 
        !data.body_fat_percentage);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking user profile:", error);
      setIsLoading(false);
    }
  };

  // Protected route component with onboarding check
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-primary/30 rounded-full mb-4"></div>
            <div className="h-4 w-24 bg-secondary rounded"></div>
          </div>
        </div>
      );
    }
    
    if (!session) {
      return <Navigate to="/auth" replace />;
    }
    
    // Redirect to onboarding if new user
    if (isNewUser && window.location.pathname !== "/onboarding") {
      return <Navigate to="/onboarding" replace />;
    }
    
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthContext.Provider value={{ session, user, isLoading, isNewUser }}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={basePath}>
              <div className="flex flex-col min-h-screen overflow-x-hidden">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route 
                    path="/onboarding" 
                    element={
                      <ProtectedRoute>
                        <Onboarding />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/fitness" 
                    element={
                      <ProtectedRoute>
                        <Fitness />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/meals" 
                    element={
                      <ProtectedRoute>
                        <Meals />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/community" 
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
