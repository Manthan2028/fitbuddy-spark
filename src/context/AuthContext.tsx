import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  difficulty?: 'easy' | 'intermediate' | 'hard';
  joinDate: string;
  streak: number;
  totalWorkouts: number;
  achievements: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateUserDifficulty: (difficulty: 'easy' | 'intermediate' | 'hard') => void;
  updateUserProgress: (workouts: number) => void;
  addAchievement: (achievement: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('fitbuddy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      joinDate: new Date().toISOString(),
      streak: 0,
      totalWorkouts: 0,
      achievements: [],
    };
    
    setUser(newUser);
    localStorage.setItem('fitbuddy_user', JSON.stringify(newUser));
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: '1',
      name: 'Demo User',
      email: 'demo@student.edu',
      joinDate: new Date().toISOString(),
      streak: 5,
      totalWorkouts: 12,
      achievements: ['first_workout', 'week_streak'],
    };
    
    setUser(newUser);
    localStorage.setItem('fitbuddy_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitbuddy_user');
  };

  const updateUserDifficulty = (difficulty: 'easy' | 'intermediate' | 'hard') => {
    if (user) {
      const updatedUser = { ...user, difficulty };
      setUser(updatedUser);
      localStorage.setItem('fitbuddy_user', JSON.stringify(updatedUser));
    }
  };

  const updateUserProgress = (workouts: number) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        totalWorkouts: user.totalWorkouts + workouts,
        streak: user.streak + 1 
      };
      setUser(updatedUser);
      localStorage.setItem('fitbuddy_user', JSON.stringify(updatedUser));
    }
  };

  const addAchievement = (achievement: string) => {
    if (user && !user.achievements.includes(achievement)) {
      const updatedUser = { 
        ...user, 
        achievements: [...user.achievements, achievement] 
      };
      setUser(updatedUser);
      localStorage.setItem('fitbuddy_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    logout,
    updateUserDifficulty,
    updateUserProgress,
    addAchievement,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};