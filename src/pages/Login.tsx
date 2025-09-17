import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Heart, Zap, Users, Chrome } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const motivationalQuotes = [
    "Every workout is a step towards a healthier you! 💪",
    "Your only competition is who you were yesterday 🌟",
    "Strong students make strong futures! 🎓",
    "Wellness is not a destination, it's a journey 🌱"
  ];

  const currentQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Welcome to FitBuddy! 🎉",
          description: "Let's start your wellness journey!",
        });
        navigate('/difficulty');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const success = await loginWithGoogle();
      if (success) {
        toast({
          title: "Welcome back! 🎉",
          description: "Ready to continue your fitness journey?",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse-glow">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gradient-hero">
                FitBuddy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-md mx-auto lg:mx-0">
              Your personal wellness companion designed for student life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto lg:mx-0">
            <div className="card-motivational p-6 rounded-2xl transition-smooth hover:scale-105">
              <Zap className="h-8 w-8 text-primary mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">Personalized Workouts</h3>
              <p className="text-sm text-muted-foreground">Tailored to your fitness level</p>
            </div>
            <div className="card-motivational p-6 rounded-2xl transition-smooth hover:scale-105">
              <Heart className="h-8 w-8 text-secondary mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">Wellness Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor mood & nutrition</p>
            </div>
            <div className="card-motivational p-6 rounded-2xl transition-smooth hover:scale-105">
              <Users className="h-8 w-8 text-accent mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">Community Challenges</h3>
              <p className="text-sm text-muted-foreground">Compete with friends</p>
            </div>
          </div>

          <div className="p-6 card-motivational rounded-2xl max-w-md mx-auto lg:mx-0">
            <p className="text-gradient-primary font-medium italic">
              "{currentQuote}"
            </p>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="card-motivational">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
              <CardDescription>
                Sign in to continue your wellness journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@student.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full btn-hero rounded-xl h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="relative">
                <Separator />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                  <span className="text-muted-foreground text-sm">or</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full rounded-xl h-12 border-2 hover:border-primary transition-smooth"
                disabled={isGoogleLoading}
              >
                <Chrome className="mr-2 h-5 w-5" />
                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
              </Button>

              <div className="text-center space-y-2">
                <Button variant="link" className="text-sm text-muted-foreground">
                  Forgot your password?
                </Button>
                <div>
                  <span className="text-sm text-muted-foreground">New to FitBuddy? </span>
                  <Button variant="link" className="text-sm p-0 h-auto font-medium text-primary">
                    Create Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;