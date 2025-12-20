import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Mail, Chrome, Zap } from 'lucide-react';
import { useAuth, DEMO_USER } from '@/hooks/use-auth';
import { toast } from 'sonner';
interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const login = useAuth((s) => s.login);
  const handleDemoLogin = () => {
    login(DEMO_USER);
    toast.success("Welcome back, Archie!");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-primary p-8 text-primary-foreground flex flex-col items-center text-center">
          <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
            <Zap className="size-6 fill-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">Leverage Architecture</DialogTitle>
          <DialogDescription className="text-primary-foreground/70 mt-2">
            Enter the neural design workspace.
          </DialogDescription>
        </div>
        <div className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="archie@leverage.build" />
              </div>
              <Button className="w-full" onClick={handleDemoLogin}>
                Continue with Email
              </Button>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2" onClick={handleDemoLogin}>
                  <Github className="size-4" /> GitHub
                </Button>
                <Button variant="outline" className="gap-2" onClick={handleDemoLogin}>
                  <Chrome className="size-4" /> Google
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="register" className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="reg-name">Full Name</Label>
                <Input id="reg-name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email Address</Label>
                <Input id="reg-email" type="email" placeholder="john@example.com" />
              </div>
              <Button className="w-full" variant="default" onClick={handleDemoLogin}>
                Create Account
              </Button>
            </TabsContent>
          </Tabs>
          <p className="mt-6 text-center text-xs text-muted-foreground px-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}