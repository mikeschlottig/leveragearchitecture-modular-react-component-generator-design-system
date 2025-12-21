import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ArrowRight, X, Cpu, Library, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
export function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isAuthenticated = useAuth(s => s.isAuthenticated);
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('onboarding-completed');
    if (isAuthenticated && !hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);
  const steps = [
    {
      title: "Welcome to Leverage",
      desc: "Transform codebases into modular React primitives. Let's take a 30-second tour of the neural workflow.",
      icon: Rocket,
      color: "bg-blue-500"
    },
    {
      title: "Step 1: Ingest Assets",
      desc: "Upload JSX, screenshots, or raw HTML. Our neural engine parses and extracts clean, Tailwind-ready primitives.",
      icon: Cpu,
      color: "bg-emerald-500"
    },
    {
      title: "Step 2: Component Library",
      desc: "Inspect your neural extracts, organize by categories, and copy production-ready code instantly.",
      icon: Library,
      color: "bg-amber-500"
    },
    {
      title: "Step 3: Architect Corner",
      desc: "Drag and drop your primitives into high-fidelity compositions. Export the entire block as a single TSX unit.",
      icon: Box,
      color: "bg-violet-500"
    }
  ];
  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else closeTour();
  };
  const closeTour = () => {
    setIsVisible(false);
    localStorage.setItem('onboarding-completed', 'true');
  };
  if (!isVisible) return null;
  const currentStep = steps[step];
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="max-w-md w-full bg-card border-2 shadow-2xl rounded-3xl overflow-hidden"
        >
          <div className={cn("p-12 flex justify-center", currentStep.color)}>
            <currentStep.icon className="size-20 text-white animate-float" />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <div key={i} className={cn("h-1 rounded-full transition-all", i === step ? "w-8 bg-primary" : "w-2 bg-muted")} />
                ))}
              </div>
              <Button variant="ghost" size="icon" className="size-8" onClick={closeTour}>
                <X className="size-4" />
              </Button>
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-tight">{currentStep.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {currentStep.desc}
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={closeTour}>Skip</Button>
              <Button className="flex-1 gap-2" onClick={handleNext}>
                {step === steps.length - 1 ? 'Get Started' : 'Next Step'} <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}