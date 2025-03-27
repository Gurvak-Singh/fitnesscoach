// Update the Landing.tsx file to include login buttons
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/App";

const features = [
  {
    name: "Personalized Meal Plans",
    description:
      "Get custom meal plans tailored to your dietary preferences and fitness goals.",
    icon: "/icons/meal-plan.svg",
  },
  {
    name: "Custom Workout Routines",
    description:
      "Access workout routines designed to help you reach your specific fitness objectives.",
    icon: "/icons/workout.svg",
  },
  {
    name: "Progress Tracking",
    description:
      "Monitor your progress with detailed tracking of your meals, workouts, and achievements.",
    icon: "/icons/progress.svg",
  },
  {
    name: "Expert Guidance",
    description:
      "Receive guidance and support from certified fitness experts to keep you motivated.",
    icon: "/icons/expert-guidance.svg",
  },
];

const testimonials = [
  {
    name: "Sarah L.",
    quote:
      "FitLife has completely transformed my approach to fitness. The personalized meal plans and workout routines have made it so much easier to stay on track and see real results.",
    image: "/images/testimonial-1.jpg",
  },
  {
    name: "Michael T.",
    quote:
      "I've tried countless fitness apps, but FitLife is the first one that truly understands my needs. The progress tracking feature is incredibly motivating, and the expert guidance has been invaluable.",
    image: "/images/testimonial-2.jpg",
  },
];

const ctaSections = [
  {
    title: "Ready to Transform Your Life?",
    description:
      "Join FitLife today and start your journey towards a healthier, happier you.",
  },
];

// Replace export default with a new component definition
const Landing = () => {
  const { session } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Your Personal
            <span className="text-primary"> Fitness Coach</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Achieve your fitness goals with personalized nutrition plans, workout routines, and progress tracking — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {session ? (
              <Button asChild size="lg" className="px-8">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="px-8">
                  <Link to="/auth">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg shadow-md bg-card"
              >
                <img
                  src={feature.icon}
                  alt={feature.name}
                  className="w-12 h-12 mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg shadow-md bg-card"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          {ctaSections.map((cta, index) => (
            <div
              key={index}
              className="text-center bg-secondary/30 rounded-lg p-8"
            >
              <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                {cta.description}
              </p>
              <Button asChild size="lg" className="px-8">
                <Link to="/auth">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Landing;
