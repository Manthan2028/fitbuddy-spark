import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Target, 
  Trophy, 
  Clock, 
  Users, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type DifficultyLevel = 'easy' | 'intermediate' | 'hard';

interface DifficultyOption {
  id: DifficultyLevel;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  workoutDuration: string;
  weeklyGoal: string;
  color: string;
  gradient: string;
}

const DifficultySelection = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserDifficulty } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const difficulties: DifficultyOption[] = [
    {
      id: 'easy',
      title: 'Easy Starter',
      subtitle: 'Perfect for beginners',
      icon: <Zap className="h-8 w-8" />,
      description: 'Gentle introduction to fitness with basic exercises and flexible scheduling',
      features: [
        '15-20 min workouts',
        '3 days per week',
        'Basic bodyweight exercises',
        'Flexible rest days',
        'Beginner-friendly nutrition tips'
      ],
      workoutDuration: '15-20 min',
      weeklyGoal: '3 workouts',
      color: 'text-accent',
      gradient: 'from-accent to-accent-glow'
    },
    {
      id: 'intermediate',
      title: 'Balanced Builder',
      subtitle: 'Steady progress',
      icon: <Target className="h-8 w-8" />,
      description: 'Moderate intensity workouts for consistent progress and habit building',
      features: [
        '25-35 min workouts',
        '4-5 days per week',
        'Mixed cardio & strength',
        'Structured meal planning',
        'Progress tracking'
      ],
      workoutDuration: '25-35 min',
      weeklyGoal: '4-5 workouts',
      color: 'text-primary',
      gradient: 'from-primary to-primary-glow'
    },
    {
      id: 'hard',
      title: 'Elite Athlete',
      subtitle: 'Maximum challenge',
      icon: <Trophy className="h-8 w-8" />,
      description: 'Intensive training for serious fitness enthusiasts ready for a challenge',
      features: [
        '45-60 min workouts',
        '6 days per week',
        'High-intensity training',
        'Advanced nutrition plans',
        'Competition preparation'
      ],
      workoutDuration: '45-60 min',
      weeklyGoal: '6 workouts',
      color: 'text-secondary',
      gradient: 'from-secondary to-secondary-glow'
    }
  ];

  const handleContinue = async () => {
    if (!selectedDifficulty) {
      toast({
        title: "Please select a difficulty level",
        description: "Choose the option that best fits your current fitness level",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUserDifficulty(selectedDifficulty);
      
      toast({
        title: "Perfect choice! 🎯",
        description: `You've selected ${selectedDifficulty} level. Let's get started!`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient-hero">
            Choose Your Fitness Level
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the difficulty level that matches your current fitness level. 
            You can always adjust this later as you progress!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {difficulties.map((difficulty) => (
            <Card
              key={difficulty.id}
              className={`card-motivational cursor-pointer transition-all duration-300 ${
                selectedDifficulty === difficulty.id
                  ? 'ring-2 ring-primary scale-105 shadow-2xl'
                  : 'hover:scale-102'
              }`}
              onClick={() => setSelectedDifficulty(difficulty.id)}
            >
              <CardHeader className="text-center space-y-4">
                <div className={`mx-auto p-4 rounded-full bg-gradient-to-r ${difficulty.gradient} text-white animate-float`}>
                  {difficulty.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold mb-2">
                    {difficulty.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {difficulty.subtitle}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-center text-muted-foreground">
                  {difficulty.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1 text-primary">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{difficulty.workoutDuration}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1 text-primary">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">Weekly Goal</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{difficulty.weeklyGoal}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-center">What's Included:</h4>
                  <ul className="space-y-2">
                    {difficulty.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedDifficulty === difficulty.id && (
                  <Badge className="w-full justify-center badge-achievement animate-scale-in">
                    Selected ✨
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleContinue}
            className="btn-hero rounded-xl h-14 px-12 text-lg"
            disabled={!selectedDifficulty || isLoading}
          >
            {isLoading ? (
              "Setting up your journey..."
            ) : (
              <>
                Continue to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          
          {selectedDifficulty && (
            <p className="mt-4 text-sm text-muted-foreground">
              Don't worry, you can change your difficulty level anytime in settings
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DifficultySelection;