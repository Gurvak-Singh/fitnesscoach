
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Dumbbell, LineChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/App";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    name: "Personalized Meal Plans",
    description:
      "Get custom meal plans tailored to your dietary preferences and fitness goals.",
    icon: <Utensils className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
  },
  {
    name: "Custom Workout Routines",
    description:
      "Access workout routines designed to help you reach your specific fitness objectives.",
    icon: <Dumbbell className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
  },
  {
    name: "Progress Tracking",
    description:
      "Monitor your progress with detailed tracking of your meals, workouts, and achievements.",
    icon: <LineChart className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
  },
  {
    name: "Expert Guidance",
    description:
      "Receive guidance and support from certified fitness experts to keep you motivated.",
    icon: <Users className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
  },
];

const testimonials = [
  {
    name: "Sarah L.",
    quote:
      "FitLife has completely transformed my approach to fitness. The personalized meal plans and workout routines have made it so much easier to stay on track and see real results.",
    avatar: "SL",
  },
  {
    name: "Michael T.",
    quote:
      "I've tried countless fitness apps, but FitLife is the first one that truly understands my needs. The progress tracking feature is incredibly motivating, and the expert guidance has been invaluable.",
    avatar: "MT",
  },
];

const ctaSections = [
  {
    title: "Ready to Transform Your Life?",
    description:
      "Join FitLife today and start your journey towards a healthier, happier you.",
  },
];

const Landing = () => {
  const { session } = useContext(AuthContext);
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 overflow-x-hidden">
      <Navbar />
      <div className="container mx-auto pt-24 md:pt-32 pb-16 md:pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 md:mb-6">
            Your Personal
            <span className="text-primary"> Fitness Coach</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Achieve your fitness goals with personalized nutrition plans, workout routines, and progress tracking — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            {session ? (
              <Button asChild size={isMobile ? "default" : "lg"} className="px-4 md:px-8">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size={isMobile ? "default" : "lg"} className="px-4 md:px-8">
                  <Link to="/auth">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size={isMobile ? "default" : "lg"}>
                  <Link to="/about">Learn More</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        
        <section className="py-8 md:py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg shadow-md bg-card"
              >
                <div className="mb-3 md:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 md:py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg shadow-md bg-card"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center text-white text-xl font-semibold mb-3 md:mb-4">
                  {testimonial.avatar}
                </div>
                <h3 className="text-base md:text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm md:text-base text-muted-foreground italic mt-2">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 md:py-16">
          {ctaSections.map((cta, index) => (
            <div
              key={index}
              className="text-center bg-secondary/30 rounded-lg p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{cta.title}</h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8">
                {cta.description}
              </p>
              <Button asChild size={isMobile ? "default" : "lg"} className="px-4 md:px-8">
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
