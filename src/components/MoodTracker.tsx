import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Smile, 
  Frown, 
  Meh, 
  Angry,
  Zap,
  Calendar,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MoodEntry {
  id: string;
  mood: 'amazing' | 'good' | 'okay' | 'stressed' | 'tired';
  note: string;
  date: string;
  timestamp: number;
}

const moodOptions = [
  { 
    id: 'amazing', 
    label: 'Amazing', 
    emoji: '😄', 
    icon: Smile, 
    color: 'text-accent',
    bgColor: 'bg-accent/10 hover:bg-accent/20 border-accent/20'
  },
  { 
    id: 'good', 
    label: 'Good', 
    emoji: '😊', 
    icon: Smile, 
    color: 'text-primary',
    bgColor: 'bg-primary/10 hover:bg-primary/20 border-primary/20'
  },
  { 
    id: 'okay', 
    label: 'Okay', 
    emoji: '😐', 
    icon: Meh, 
    color: 'text-warning',
    bgColor: 'bg-warning/10 hover:bg-warning/20 border-warning/20'
  },
  { 
    id: 'stressed', 
    label: 'Stressed', 
    emoji: '😰', 
    icon: Frown, 
    color: 'text-secondary',
    bgColor: 'bg-secondary/10 hover:bg-secondary/20 border-secondary/20'
  },
  { 
    id: 'tired', 
    label: 'Tired', 
    emoji: '😴', 
    icon: Angry, 
    color: 'text-muted-foreground',
    bgColor: 'bg-muted hover:bg-muted/80 border-muted'
  }
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem('fitbuddy_mood_entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSubmitMood = async () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "How are you feeling today?",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        mood: selectedMood as any,
        note: note.trim(),
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
      };

      const updatedEntries = [newEntry, ...entries.slice(0, 9)]; // Keep last 10 entries
      setEntries(updatedEntries);
      localStorage.setItem('fitbuddy_mood_entries', JSON.stringify(updatedEntries));

      // Reset form
      setSelectedMood(null);
      setNote('');

      toast({
        title: "Mood logged! 💭",
        description: "Thanks for sharing how you're feeling today.",
      });
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

  const getTodaysEntry = () => {
    const today = new Date().toLocaleDateString();
    return entries.find(entry => entry.date === today);
  };

  const todaysEntry = getTodaysEntry();
  
  // Get mood distribution for insights
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getMostCommonMood = () => {
    if (entries.length === 0) return null;
    return Object.entries(moodCounts).reduce((a, b) => moodCounts[a[0]] > moodCounts[b[0]] ? a : b)[0];
  };

  const mostCommonMood = getMostCommonMood();
  const selectedMoodData = moodOptions.find(m => m.id === selectedMood);

  return (
    <Card className="card-motivational">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Mood Tracker
            </CardTitle>
            <CardDescription>
              How are you feeling today?
            </CardDescription>
          </div>
          {entries.length > 0 && (
            <Badge className="badge-achievement">
              {entries.length} entries
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {todaysEntry ? (
          // Show today's entry
          <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">
                {moodOptions.find(m => m.id === todaysEntry.mood)?.emoji}
              </div>
              <div>
                <h4 className="font-semibold">Today's Mood: {moodOptions.find(m => m.id === todaysEntry.mood)?.label}</h4>
                <p className="text-sm text-muted-foreground">Logged at {new Date(todaysEntry.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
            {todaysEntry.note && (
              <div className="p-3 bg-background rounded-lg">
                <p className="text-sm italic">"{todaysEntry.note}"</p>
              </div>
            )}
          </div>
        ) : (
          // Mood selection form
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((mood) => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.id;
                
                return (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                      isSelected 
                        ? mood.bgColor + ' border-current transform scale-105' 
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <span className={`text-xs font-medium ${isSelected ? mood.color : 'text-muted-foreground'}`}>
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedMood && (
              <div className="space-y-4 animate-scale-in">
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    You're feeling <span className={`font-semibold ${selectedMoodData?.color}`}>
                      {selectedMoodData?.label.toLowerCase()}
                    </span> today {selectedMoodData?.emoji}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">How was your day? (Optional)</label>
                  <Textarea
                    placeholder="Share what's on your mind... any wins, challenges, or thoughts?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="resize-none rounded-xl"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleSubmitMood}
                  disabled={isLoading}
                  className="w-full btn-hero h-10"
                >
                  {isLoading ? "Saving..." : "Log My Mood"}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Recent entries or insights */}
        {entries.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h4 className="font-semibold">Your Wellness Insights</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted/30 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Most Common Mood</p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg">
                    {moodOptions.find(m => m.id === mostCommonMood)?.emoji}
                  </span>
                  <span className="font-semibold text-sm">
                    {moodOptions.find(m => m.id === mostCommonMood)?.label}
                  </span>
                </div>
              </div>
              
              <div className="p-3 bg-muted/30 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Tracking Days</p>
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-primary">{entries.length}</span>
                </div>
              </div>
            </div>

            {entries.length >= 3 && (
              <div className="p-3 bg-primary/10 rounded-xl text-center">
                <BookOpen className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-primary font-medium">
                  Great job tracking your mood! Consistent logging helps improve self-awareness.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};