
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Utensils, Dumbbell, LineChart, ShoppingCart, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">
            <span className="mr-1 text-primary">New</span> Your personal fitness journey starts here
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            <span className="text-primary">Fit</span>Life Coach
          </h1>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            Your all-in-one fitness companion that creates personalized meal plans and workout routines
            based on your unique goals, preferences, and lifestyle.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="group">
              <Link to="/onboarding">
                Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">How FitLife Coach Helps You</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Personalized Goals</h3>
              <p className="text-muted-foreground">
                Set your fitness goals and track your progress. Whether it's weight loss, muscle gain,
                or maintaining a healthy lifestyle.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Custom Meal Plans</h3>
              <p className="text-muted-foreground">
                Get meal plans tailored to your dietary preferences, allergies, and fitness goals with
                the right balance of nutrients.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Adaptive Workouts</h3>
              <p className="text-muted-foreground">
                Personalized workout routines based on your goals, available equipment, and fitness level that adapt as you progress.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Track your workout history, record reps and weights, and sync with wearable devices to monitor your fitness journey.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Video Demonstrations</h3>
              <p className="text-muted-foreground">
                Watch HD video clips demonstrating proper exercise form and technique to maximize results and prevent injuries.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-lg bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Grocery Lists</h3>
              <p className="text-muted-foreground">
                Automatically generated shopping lists based on your meal plans to make grocery shopping
                effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold">Ready to Start Your Fitness Journey?</h2>
        <p className="mb-8 mx-auto max-w-2xl text-muted-foreground">
          Create your personalized profile now and get custom meal plans and workout routines designed specifically for your goals.
        </p>
        <Button asChild size="lg" className="group">
          <Link to="/onboarding">
            Create Your Profile <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>FitLife Coach — Your personalized fitness journey</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
