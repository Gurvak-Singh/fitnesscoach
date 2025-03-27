
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">About FitMeal Tracker</h1>
        </div>
        
        <div className="space-y-8 max-w-3xl mx-auto">
          <section>
            <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
            <p className="text-muted-foreground">
              At FitMeal Tracker, we believe that achieving your fitness goals shouldn't be complicated. 
              Our mission is to provide a personalized approach to nutrition and fitness that fits your 
              lifestyle, preferences, and unique goals.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">How It Works</h2>
            <div className="space-y-4">
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-2">1. Create Your Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us about your goals, activity level, dietary preferences, and cooking style.
                  This helps us understand your unique needs.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-2">2. Get Personalized Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your profile, we create custom meal plans and workout routines designed
                  specifically for you.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-2">3. Track Your Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Log your meals and workouts, monitor your progress, and adjust your plans as needed
                  to stay on track toward your goals.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-2">4. Achieve Your Goals</h3>
                <p className="text-sm text-muted-foreground">
                  With consistent tracking and personalized guidance, you'll make steady progress
                  toward your fitness and nutrition goals.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li><span className="font-medium">BMI Calculator:</span> Understand your current fitness status</li>
              <li><span className="font-medium">Custom Meal Plans:</span> Tailored to your preferences and goals</li>
              <li><span className="font-medium">Workout Tracking:</span> Keep track of your exercise routine</li>
              <li><span className="font-medium">Progress Visualization:</span> See your improvements over time</li>
              <li><span className="font-medium">Grocery Lists:</span> Auto-generated shopping lists for your meal plans</li>
              <li><span className="font-medium">Dietary Accommodations:</span> Support for various diets and allergies</li>
            </ul>
          </section>
          
          <div className="pt-4 text-center">
            <Button asChild size="lg" className="group">
              <Link to="/onboarding">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
