import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, 
  Clock, 
  Target, 
  CheckCircle, 
  Play,
  Calendar,
  Zap,
  TrendingUp,
  Heart,
  Trophy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Workout {
  id: string;
  name: string;
  duration: number;
  exercises: string[];
  calories: number;
  difficulty: 'easy' | 'intermediate' | 'hard';
  completed: boolean;
  type: 'strength' | 'cardio' | 'flexibility' | 'mixed';
}

interface UserRoadmapProps {
  difficulty?: 'easy' | 'intermediate' | 'hard';
  onWorkoutComplete: (calories: number) => void;
}

export const UserRoadmap = ({ difficulty = 'easy', onWorkoutComplete }: UserRoadmapProps) => {
  const { toast } = useToast();
  const [workouts, setWorkouts] = useState<Workout[]>(getWorkoutsByDifficulty(difficulty));
  const [currentWorkout, setCurrentWorkout] = useState<string | null>(null);

  function getWorkoutsByDifficulty(level: string): Workout[] {
    const baseWorkouts = {
      easy: [
        {
          id: '1',
          name: 'Morning Energizer',
          duration: 15,
          exercises: ['Light stretching', '10 squats', '5 push-ups', 'Walking in place'],
          calories: 80,
          difficulty: 'easy' as const,
          completed: false,
          type: 'mixed' as const
        },
        {
          id: '2',
          name: 'Study Break Boost',
          duration: 10,
          exercises: ['Desk stretches', 'Standing movements', 'Deep breathing'],
          calories: 50,
          difficulty: 'easy' as const,
          completed: false,
          type: 'flexibility' as const
        },
        {
          id: '3',
          name: 'Evening Wind Down',
          duration: 20,
          exercises: ['Gentle yoga', 'Light stretching', 'Meditation'],
          calories: 60,
          difficulty: 'easy' as const,
          completed: false,
          type: 'flexibility' as const
        }
      ],
      intermediate: [
        {
          id: '1',
          name: 'HIIT Power Session',
          duration: 30,
          exercises: ['Burpees x10', 'Jump squats x15', 'Mountain climbers x20', 'Rest intervals'],
          calories: 200,
          difficulty: 'intermediate' as const,
          completed: false,
          type: 'cardio' as const
        },
        {
          id: '2',
          name: 'Strength Builder',
          duration: 35,
          exercises: ['Push-ups x15', 'Squats x20', 'Lunges x12', 'Plank 60s'],
          calories: 180,
          difficulty: 'intermediate' as const,
          completed: false,
          type: 'strength' as const
        },
        {
          id: '3',
          name: 'Core & Cardio Mix',
          duration: 25,
          exercises: ['Jumping jacks', 'Bicycle crunches', 'High knees', 'Russian twists'],
          calories: 150,
          difficulty: 'intermediate' as const,
          completed: false,
          type: 'mixed' as const
        }
      ],
      hard: [
        {
          id: '1',
          name: 'Elite HIIT Challenge',
          duration: 45,
          exercises: ['Burpees x20', 'Jump squats x25', 'Deadlifts x15', 'Sprint intervals'],
          calories: 350,
          difficulty: 'hard' as const,
          completed: false,
          type: 'cardio' as const
        },
        {
          id: '2',
          name: 'Strength Domination',
          duration: 50,
          exercises: ['Push-ups x25', 'Squats x30', 'Pull-ups x10', 'Plank 120s'],
          calories: 300,
          difficulty: 'hard' as const,
          completed: false,
          type: 'strength' as const
        },
        {
          id: '3',
          name: 'Endurance Beast',
          duration: 60,
          exercises: ['Circuit training', 'Compound movements', 'Cardio intervals'],
          calories: 400,
          difficulty: 'hard' as const,
          completed: false,
          type: 'mixed' as const
        }
      ]
    };
    return baseWorkouts[level] || baseWorkouts.easy;
  }

  const handleStartWorkout = (workoutId: string) => {
    setCurrentWorkout(workoutId);
    const workout = workouts.find(w => w.id === workoutId);
    
    if (workout) {
      toast({
        title: "Workout Started! 🔥",
        description: `${workout.name} - ${workout.duration} minutes. You've got this!`,
      });

      // Simulate workout completion after 3 seconds
      setTimeout(() => {
        handleCompleteWorkout(workoutId);
      }, 3000);
    }
  };

  const handleCompleteWorkout = (workoutId: string) => {
    setWorkouts(prev => 
      prev.map(workout => 
        workout.id === workoutId 
          ? { ...workout, completed: true }
          : workout
      )
    );
    
    const workout = workouts.find(w => w.id === workoutId);
    if (workout) {
      onWorkoutComplete(workout.calories);
      toast({
        title: "Workout Complete! 🎉",
        description: `Amazing work! You burned ${workout.calories} calories.`,
      });
    }
    
    setCurrentWorkout(null);
  };

  const completedWorkouts = workouts.filter(w => w.completed).length;
  const progressPercentage = (completedWorkouts / workouts.length) * 100;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'strength': return <Dumbbell className="h-4 w-4" />;
      case 'cardio': return <Heart className="h-4 w-4" />;
      case 'flexibility': return <Zap className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'strength': return 'text-primary';
      case 'cardio': return 'text-secondary';
      case 'flexibility': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="card-motivational">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Roadmap
            </CardTitle>
            <CardDescription>
              Your personalized {difficulty} level workouts
            </CardDescription>
          </div>
          <Badge className="badge-achievement">
            {completedWorkouts}/{workouts.length} Complete
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {workouts.map((workout, index) => (
          <div
            key={workout.id}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              workout.completed 
                ? 'border-accent bg-accent/5' 
                : currentWorkout === workout.id
                ? 'border-primary bg-primary/5 animate-pulse-glow'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${workout.completed ? 'bg-accent text-white' : 'bg-muted'}`}>
                  {workout.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    getTypeIcon(workout.type)
                  )}
                </div>
                <div>
                  <h4 className="font-semibold">{workout.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {workout.calories} cal
                    </span>
                  </div>
                </div>
              </div>
              
              {!workout.completed && (
                <Button
                  onClick={() => handleStartWorkout(workout.id)}
                  disabled={currentWorkout === workout.id}
                  className="btn-hero h-9 px-4"
                  size="sm"
                >
                  {currentWorkout === workout.id ? (
                    "In Progress..."
                  ) : (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Exercises:</p>
              <div className="flex flex-wrap gap-2">
                {workout.exercises.map((exercise, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {exercise}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}

        {completedWorkouts === workouts.length && (
          <div className="text-center p-6 card-motivational rounded-xl">
            <Trophy className="h-12 w-12 text-accent mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-semibold text-accent mb-2">
              Daily Goal Achieved! 🎉
            </h3>
            <p className="text-sm text-muted-foreground">
              You've completed all your workouts for today. Amazing work!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};