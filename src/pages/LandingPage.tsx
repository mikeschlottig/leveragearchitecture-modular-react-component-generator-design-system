import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Layout, Code2, Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { LoginModal } from '@/components/auth/LoginModal';
export function LandingPage() {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.triggerLogin) {
      setShowLoginModal(true);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary fill-primary" />
            <span className="text-xl font-bold tracking-tight">LeverageArchitecture</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
            <a href="#workflow" className="text-sm font-medium text-muted-foreground hover:text-foreground">Workflow</a>
            <Link to="/app/dashboard">
              <Button size="sm">Enter Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase rounded-full bg-primary/10 text-primary">
              Next-Gen Design Systems
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-8">
              Codebases to <br />
              <span className="text-gradient">Modular Primitives</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 text-pretty">
              Transform messy codebases and screenshots into high-performance React component libraries. Bridge the gap between design and engineering instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/app/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg rounded-xl">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl" onClick={() => setShowLoginModal(true)}>
                Sign In Free
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Feature Grid */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Atomic Reusability</h2>
            <p className="text-muted-foreground">Everything you need to scale your UI architecture.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Code2, 
                title: "Code Parsing", 
                desc: "Ingest any JSX or HTML file and let AI extract functional primitives." 
              },
              { 
                icon: Layout, 
                title: "Visual Extraction", 
                desc: "Upload a screenshot. Get pixel-perfect Tailwind components." 
              },
              { 
                icon: Layers, 
                title: "Architectural Glue", 
                desc: "Compose primitives into complex templates with drag-and-drop ease." 
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-background border shadow-sm"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Usage Note Footer */}
      <footer className="py-12 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <span className="font-bold">LeverageArchitecture</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full border">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>AI Rate Limit Active: Distributed resources across active sessions.</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Cloudflare Agent Systems. All rights reserved.</p>
        </div>
      </footer>
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
}