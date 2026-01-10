import { createContext, useContext, useState } from "react";


type User = {
  id: number;
  fullName: string;
  email: string;
  experienceLevel?: string;
  duration?: number;
  raceDate?: string;
};

type AuthContextType = {
  user: User | null;
  trainingPlan: TrainingPlan | null;
  login: (user: User, plan: TrainingPlan) => void;
  logout: () => void;
  setTrainingPlan: (plan: TrainingPlan | null | ((prev: TrainingPlan | null) => TrainingPlan | null)) => void;
};

//types to describe the format of the trainingplan 
type TrainingPlan = {
  level: string;
  weeks: number;
  raceDate: string;
  sections: TrainingWeek[];
};

type TrainingWeek = {
  title: string;
  data: Workout[];
};

type Workout = {
  date: string;
  isoDate: string;
  description: string;
  image: string;
  time?: string;
  complete: boolean;
};



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);

  const login = (userData: User, plan: TrainingPlan) => {
    setUser(userData);
    setTrainingPlan(plan);
  };

  const logout = () => {
    setUser(null);
    setTrainingPlan(null);
  };

  return (
    <AuthContext.Provider value={{ user, trainingPlan, login, logout, setTrainingPlan }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};