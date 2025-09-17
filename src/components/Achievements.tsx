import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Medal, 
  Star, 
  Crown, 
  Zap, 
  Calendar,
  Target,
  Heart,
  Users,
  TrendingUp,
  Flame,
  CheckCircle,
  Lock
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  category: 'workout' | 'streak' | 'social' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  reward?: string;
}

interface AchievementsProps {
  achievements: string[];
}

export const Achievements = ({ achievements }: AchievementsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allAchievements: Achievement[] = [
    {
      id: 'first_workout',
      title: 'First Steps',
      description: 'Complete your very first workout',
      icon: <Zap className="h-6 w-6" />,
      unlocked: achievements.includes('first_workout'),
      category: 'workout',
      rarity: 'common',
      reward: '+50 XP'
    },
    {
      id: 'week_streak',
      title: 'Consistent Warrior',
      description: 'Maintain a 7-day workout streak',
      icon: <Flame className="h-6 w-6" />,
      unlocked: achievements.includes('week_streak'),
      category: 'streak',
      rarity: 'rare',
      reward: '+100 XP'
    },
    {
      id: 'ten_workouts',
      title: 'Dedicated Student',
      description: 'Complete 10 total workouts',
      icon: <Medal className="h-6 w-6" />,
      unlocked: achievements.includes('ten_workouts'),
      progress: achievements.includes('ten_workouts') ? 10 : Math.min(achievements.length * 2, 10),
      maxProgress: 10,
      category: 'workout',
      rarity: 'common',
      reward: '+75 XP'
    },
    {
      id: 'mood_tracker',
      title: 'Self Aware',
      description: 'Log your mood for 5 consecutive days',
      icon: <Heart className="h-6 w-6" />,
      unlocked: achievements.includes('mood_tracker'),
      progress: 3,
      maxProgress: 5,
      category: 'milestone',
      rarity: 'rare',
      reward: '+125 XP'
    },
    {
      id: 'social_butterfly',
      title: 'Community Builder',
      description: 'Join your first community challenge',
      icon: <Users className="h-6 w-6" />,
      unlocked: achievements.includes('social_butterfly'),
      category: 'social',
      rarity: 'common',
      reward: '+60 XP'
    },
    {
      id: 'challenge_winner',
      title: 'Challenge Champion',
      description: 'Win a community challenge',
      icon: <Crown className="h-6 w-6" />,
      unlocked: achievements.includes('challenge_winner'),
      category: 'social',
      rarity: 'epic',
      reward: '+200 XP'
    },
    {
      id: 'month_streak',
      title: 'Fitness Legend',
      description: 'Maintain a 30-day workout streak',
      icon: <Trophy className="h-6 w-6" />,
      unlocked: achievements.includes('month_streak'),
      progress: 7,
      maxProgress: 30,
      category: 'streak',
      rarity: 'legendary',
      reward: '+500 XP'
    },
    {
      id: 'perfect_week',
      title: 'Wellness Master',
      description: 'Complete workouts, nutrition, and mood tracking for 7 days',
      icon: <Star className="h-6 w-6" />,
      unlocked: achievements.includes('perfect_week'),
      progress: 2,
      maxProgress: 7,
      category: 'milestone',
      rarity: 'epic',
      reward: '+300 XP'
    }
  ];

  const categories = [
    { id: 'workout', label: 'Workouts', icon: Zap, color: 'text-primary' },
    { id: 'streak', label: 'Streaks', icon: Flame, color: 'text-secondary' },
    { id: 'social', label: 'Social', icon: Users, color: 'text-accent' },
    { id: 'milestone', label: 'Milestones', icon: Target, color: 'text-warning' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground border-muted';
      case 'rare': return 'text-primary border-primary';
      case 'epic': return 'text-secondary border-secondary';
      case 'legendary': return 'text-accent border-accent';
      default: return 'text-muted-foreground border-muted';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-muted/20';
      case 'rare': return 'bg-primary/10';
      case 'epic': return 'bg-secondary/10';
      case 'legendary': return 'bg-accent/10';
      default: return 'bg-muted/20';
    }
  };

  const filteredAchievements = selectedCategory 
    ? allAchievements.filter(achievement => achievement.category === selectedCategory)
    : allAchievements;

  const unlockedCount = allAchievements.filter(a => a.unlocked).length;
  const totalCount = allAchievements.length;
  const completionPercentage = (unlockedCount / totalCount) * 100;

  return (
    <Card className="card-motivational">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>
              Your wellness milestones and rewards
            </CardDescription>
          </div>
          <Badge className="badge-achievement">
            {unlockedCount}/{totalCount} Unlocked
          </Badge>
        </div>

        {/* Progress overview */}
        <div className="p-4 bg-muted/30 rounded-xl space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="h-8 text-xs"
          >
            All
          </Button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="h-8 text-xs"
              >
                <Icon className="h-3 w-3 mr-1" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Achievements grid */}
        <div className="grid gap-4">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                achievement.unlocked 
                  ? `${getRarityColor(achievement.rarity)} ${getRarityBg(achievement.rarity)} border-opacity-50`
                  : 'border-muted bg-muted/10 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${
                  achievement.unlocked 
                    ? `${getRarityBg(achievement.rarity)} ${getRarityColor(achievement.rarity)}`
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {achievement.unlocked ? achievement.icon : <Lock className="h-6 w-6" />}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-semibold ${achievement.unlocked ? '' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <Badge 
                        variant={achievement.unlocked ? "default" : "secondary"}
                        className={`text-xs ${
                          achievement.unlocked ? getRarityColor(achievement.rarity) : ''
                        }`}
                      >
                        {achievement.rarity}
                      </Badge>
                      {achievement.unlocked && (
                        <p className="text-xs text-accent font-medium mt-1">
                          {achievement.reward}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Progress bar for incomplete achievements */}
                  {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {achievement.unlocked && (
                    <div className="flex items-center gap-2 text-accent">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Unlocked!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {unlockedCount > 0 && (
          <div className="text-center p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/20">
            <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-sm font-medium text-accent">
              You've unlocked {unlockedCount} achievement{unlockedCount !== 1 ? 's' : ''}! 
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Keep going to unlock more rewards and recognition!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};