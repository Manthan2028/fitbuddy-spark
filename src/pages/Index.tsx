import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // User is logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // No user, redirect to login (which is the same as "/" route)
      // This component shouldn't really be reached since "/" routes to Login
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gradient-hero">FitBuddy</h1>
        <p className="text-xl text-muted-foreground">Loading your wellness journey...</p>
      </div>
    </div>
  );
};

export default Index;
