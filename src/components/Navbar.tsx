
import React, { useState, useEffect } from "react";
import { Menu, Moon, Sun, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4",
        scrolled 
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-1">
          <span className="text-primary text-xl font-bold">Fit</span>
          <span className="text-xl font-bold">Meal</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors">
            Profile
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          
          <Link 
            to="/profile"
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="User profile"
          >
            <User className="w-5 h-5" />
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="p-2 rounded-full hover:bg-secondary transition-colors md:hidden"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="mb-6">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                <Link to="/" className="py-2 px-4 hover:bg-secondary rounded-md transition-colors">
                  Dashboard
                </Link>
                <Link to="/profile" className="py-2 px-4 hover:bg-secondary rounded-md transition-colors">
                  Profile
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
