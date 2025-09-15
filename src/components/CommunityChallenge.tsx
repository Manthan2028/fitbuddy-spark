import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Trophy, 
  Plus, 
  Target, 
  Calendar,
  Flame,
  Medal,
  Crown,
  Star,
  TrendingUp,
  Timer,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team';
  duration: string;
  reward: string;
  participants: number;
  maxParticipants?: number;
  progress: number;
  target: number;
  unit: string;
  startDate: string;
  endDate: string;
  joined: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'cardio' | 'strength' | 'wellness' | 'social';
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  progress: number;
  rank: number;
  isCurrentUser?: boolean;
}

export const CommunityChallenge = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>(['1', '3']);
  const { toast } = useToast();

  const challenges: Challenge[] = [
    {
      id: '1',
      title: '30-Day Consistency Challenge',
      description: 'Complete at least 20 minutes of activity daily for 30 days',
      type: 'individual',
      duration: '30 days',
      reward: '500 XP + Consistency Badge',
      participants: 234,
      maxParticipants: 500,
      progress: 7,
      target: 30,
      unit: 'days',
      startDate: '2024-01-01',
      endDate: '2024-01-30',
      joined: true,
      difficulty: 'medium',
      category: 'wellness'
    },
    {
      id: '2',
      title: 'Study Squad Sprint',
      description: 'Team up with 4 friends for daily 15-min workouts during exam week',
      type: 'team',
      duration: '7 days',
      reward: '300 XP + Team Spirit Badge',
      participants: 45,
      maxParticipants: 100,
      progress: 0,
      target: 7,
      unit: 'days',
      startDate: '2024-01-15',
      endDate: '2024-01-21',
      joined: false,
      difficulty: 'easy',
      category: 'social'
    },
    {
      id: '3',
      title: 'Campus Cardio Kings',
      description: 'Burn 2000 calories this week through cardio activities',
      type: 'individual',
      duration: '7 days',
      reward: '200 XP + Cardio Champion Badge',
      participants: 156,
      progress: 850,
      target: 2000,
      unit: 'calories',
      startDate: '2024-01-08',
      endDate: '2024-01-14',
      joined: true,
      difficulty: 'hard',
      category: 'cardio'
    },
    {
      id: '4',
      title: 'Mindful January',
      description: 'Complete mood tracking and one mindfulness activity daily',
      type: 'individual',
      duration: '31 days',
      reward: '400 XP + Mindfulness Master Badge',
      participants: 89,
      progress: 0,
      target: 31,
      unit: 'days',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      joined: false,
      difficulty: 'easy',
      category: 'wellness'
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { id: '1', name: 'Alex Chen', avatar: '', progress: 1950, rank: 1 },
    { id: '2', name: 'Sarah Kim', avatar: '', progress: 1830, rank: 2 },
    { id: '3', name: 'Mike Johnson', avatar: '', progress: 1720, rank: 3 },
    { id: '4', name: 'You', avatar: '', progress: 850, rank: 8, isCurrentUser: true },
  ];

  const handleJoinChallenge = (challengeId: string) => {
    if (joinedChallenges.includes(challengeId)) {
      setJoinedChallenges(prev => prev.filter(id => id !== challengeId));
      toast({
        title: "Left challenge",
        description: "You've left the challenge. You can rejoin anytime!",
      });
    } else {
      setJoinedChallenges(prev => [...prev, challengeId]);
      toast({
        title: "Challenge joined! 🎉",
        description: "Good luck! Check your progress in the leaderboard.",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-accent';
      case 'medium': return 'text-primary';
      case 'hard': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cardio': return <Flame className="h-4 w-4" />;
      case 'strength': return <Trophy className="h-4 w-4" />;
      case 'wellness': return <Star className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const activeChallenges = challenges.filter(c => joinedChallenges.includes(c.id));
  const availableChallenges = challenges.filter(c => !joinedChallenges.includes(c.id));

  return (
    <Card className="card-motivational">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Community Challenges
            </CardTitle>
            <CardDescription>
              Join challenges and compete with fellow students
            </CardDescription>
          </div>
          <Button className="btn-hero h-9" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Create Challenge
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">My Challenges</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeChallenges.length === 0 ? (
              <div className="text-center p-8 space-y-4">
                <Target className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-2">No Active Challenges</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join a challenge to start competing with other students!
                  </p>
                  <Button 
                    onClick={() => setActiveTab('available')}
                    className="btn-hero"
                  >
                    Browse Challenges
                  </Button>
                </div>
              </div>
            ) : (
              activeChallenges.map((challenge) => (
                <div key={challenge.id} className="p-4 border border-primary/20 bg-primary/5 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{challenge.title}</h4>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Timer className="h-3 w-3" />
                          {challenge.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {challenge.participants} participants
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.target} {challenge.unit}</span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.target) * 100} 
                      className="h-2"
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-accent">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-medium">{challenge.reward}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleJoinChallenge(challenge.id)}
                        className="h-8 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        Leave Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            {availableChallenges.map((challenge) => (
              <div key={challenge.id} className="p-4 border border-border hover:border-primary/50 rounded-xl transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(challenge.category)}
                        <h4 className="font-semibold">{challenge.title}</h4>
                      </div>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      {challenge.type === 'team' && (
                        <Badge variant="secondary">Team</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        {challenge.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {challenge.participants}
                        {challenge.maxParticipants && `/${challenge.maxParticipants}`} participants
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Starts {new Date(challenge.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-accent">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">{challenge.reward}</span>
                  </div>
                  <Button 
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className="btn-hero h-8"
                    size="sm"
                  >
                    Join Challenge
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Campus Cardio Kings</h4>
                <Badge className="badge-achievement">2000 cal target</Badge>
              </div>
              
              {leaderboard.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                    entry.isCurrentUser 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    entry.rank === 1 ? 'rank-gold' :
                    entry.rank === 2 ? 'rank-silver' :
                    entry.rank === 3 ? 'rank-bronze' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {entry.rank <= 3 ? (
                      <Crown className="h-4 w-4" />
                    ) : (
                      entry.rank
                    )}
                  </div>

                  <Avatar className="h-8 w-8">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-xs">
                      {entry.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                        {entry.name}
                        {entry.isCurrentUser && (
                          <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
                        )}
                      </span>
                      <div className="text-right">
                        <span className="font-semibold">{entry.progress}</span>
                        <span className="text-sm text-muted-foreground"> / 2000 cal</span>
                      </div>
                    </div>
                    <Progress 
                      value={(entry.progress / 2000) * 100} 
                      className="h-1 mt-1"
                    />
                  </div>
                </div>
              ))}

              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  You're currently #8 out of 156 participants. Keep going! 💪
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};