import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Apple, 
  Zap, 
  Beef, 
  Wheat, 
  Droplets,
  TrendingUp,
  ChefHat,
  Clock,
  Heart
} from 'lucide-react';

interface NutritionData {
  id: string;
  meal: string;
  time: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  description: string;
  image?: string;
}

interface NutritionSuggestionProps {
  caloriesBurned: number;
}

export const NutritionSuggestion = ({ caloriesBurned }: NutritionSuggestionProps) => {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  // Calculate recommended calories based on burned calories
  const baseCalories = 1800; // Base daily calories for students
  const recommendedCalories = baseCalories + (caloriesBurned * 0.8); // Replenish 80% of burned calories

  const nutritionPlan: NutritionData[] = [
    {
      id: '1',
      meal: 'Pre-Workout Snack',
      time: '30 min before workout',
      protein: 5,
      carbs: 25,
      fats: 2,
      calories: 140,
      description: 'Banana with almond butter for quick energy'
    },
    {
      id: '2',
      meal: 'Post-Workout Recovery',
      time: 'Within 30 min after workout',
      protein: 20,
      carbs: 30,
      fats: 5,
      calories: 240,
      description: 'Greek yogurt with berries and granola'
    },
    {
      id: '3',
      meal: 'Balanced Lunch',
      time: '12:00 - 14:00',
      protein: 25,
      carbs: 45,
      fats: 12,
      calories: 380,
      description: 'Grilled chicken with quinoa and vegetables'
    },
    {
      id: '4',
      meal: 'Study Fuel Dinner',
      time: '18:00 - 20:00',
      protein: 30,
      carbs: 40,
      fats: 15,
      calories: 400,
      description: 'Salmon with sweet potato and green salad'
    }
  ];

  const totalPlannedCalories = nutritionPlan.reduce((sum, meal) => sum + meal.calories, 0);
  const calorieProgress = (totalPlannedCalories / recommendedCalories) * 100;

  const getMacroColor = (macro: string) => {
    switch (macro) {
      case 'protein': return 'text-primary';
      case 'carbs': return 'text-secondary';
      case 'fats': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getMacroIcon = (macro: string) => {
    switch (macro) {
      case 'protein': return <Beef className="h-4 w-4" />;
      case 'carbs': return <Wheat className="h-4 w-4" />;
      case 'fats': return <Droplets className="h-4 w-4" />;
      default: return <Apple className="h-4 w-4" />;
    }
  };

  return (
    <Card className="card-motivational">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              Nutrition Suggestions
            </CardTitle>
            <CardDescription>
              Fuel your body based on today's activity
            </CardDescription>
          </div>
          <Badge className="badge-achievement">
            {Math.round(calorieProgress)}% of goal
          </Badge>
        </div>

        {/* Calorie Summary */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Burned</span>
            </div>
            <p className="text-lg font-bold text-accent">{caloriesBurned} cal</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Apple className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Recommended</span>
            </div>
            <p className="text-lg font-bold text-primary">{Math.round(recommendedCalories)} cal</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Intake Progress</span>
            <span>{Math.round(calorieProgress)}%</span>
          </div>
          <Progress value={Math.min(calorieProgress, 100)} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {nutritionPlan.map((meal) => (
          <div
            key={meal.id}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
              selectedMeal === meal.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedMeal(selectedMeal === meal.id ? null : meal.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold">{meal.meal}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {meal.time}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{meal.calories} cal</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{meal.description}</p>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {getMacroIcon('protein')}
                  <span className="text-xs text-primary">Protein</span>
                </div>
                <p className="text-sm font-semibold">{meal.protein}g</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {getMacroIcon('carbs')}
                  <span className="text-xs text-secondary">Carbs</span>
                </div>
                <p className="text-sm font-semibold">{meal.carbs}g</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {getMacroIcon('fats')}
                  <span className="text-xs text-accent">Fats</span>
                </div>
                <p className="text-sm font-semibold">{meal.fats}g</p>
              </div>
            </div>

            {selectedMeal === meal.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <Button className="w-full btn-hero h-9" size="sm">
                  <Heart className="h-3 w-3 mr-1" />
                  Add to Meal Plan
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="text-center p-4 bg-muted/30 rounded-xl">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Eat within 30 minutes after your workout for optimal recovery!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};