import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import { 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Dumbbell, 
  Apple, 
  Heart,
  Trophy,
  Users,
  Target,
  Calendar,
  Flame,
  TrendingUp,
  Medal,
  Crown,
  Star,
  Plus,
  ChevronRight
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { UserRoadmap } from '@/components/UserRoadmap';
import { NutritionSuggestion } from '@/components/NutritionSuggestion';
import { MoodTracker } from '@/components/MoodTracker';
import { Achievements } from '@/components/Achievements';
import { CommunityChallenge } from '@/components/CommunityChallenge';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleWorkoutComplete = (calories: number) => {
    setCaloriesBurned(prev => prev + calories);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto p-4 pt-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl lg:text-4xl font-bold">
              {getGreeting()}, {user.name}! 👋
            </h1>
            <Badge className="badge-achievement">
              {user.difficulty || 'Getting Started'}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Ready to crush your wellness goals today?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-motivational">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{user.streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
          
          <Card className="card-motivational">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Dumbbell className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-2xl font-bold text-secondary">{user.totalWorkouts}</p>
              <p className="text-sm text-muted-foreground">Total Workouts</p>
            </CardContent>
          </Card>

          <Card className="card-motivational">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">{user.achievements.length}</p>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>

          <Card className="card-motivational">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">{caloriesBurned}</p>
              <p className="text-sm text-muted-foreground">Calories Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <UserRoadmap 
              difficulty={user.difficulty} 
              onWorkoutComplete={handleWorkoutComplete}
            />
            <MoodTracker />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <NutritionSuggestion caloriesBurned={caloriesBurned} />
            <Achievements achievements={user.achievements} />
          </div>
        </div>

        {/* Community Challenges - Full Width */}
        <CommunityChallenge />
      </main>
    </div>
  );
};

export default Dashboard;