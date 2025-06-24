import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserData, HeroStep } from '../types';

interface AppState {
  userData: UserData;
  currentStep: HeroStep;
  
  // Actions
  updateUserData: (data: Partial<UserData>) => void;
  setCurrentStep: (step: HeroStep) => void;
  completeStep: (step: string) => void;
  resetProgress: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userData: {
        completedSteps: [],
        currentStep: 'landing',
        startedAt: new Date()
      },
      currentStep: 'landing',
      
      updateUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data }
        })),
        
      setCurrentStep: (step) => set({ currentStep: step }),
      
      completeStep: (step) =>
        set((state) => ({
          userData: {
            ...state.userData,
            completedSteps: [...state.userData.completedSteps, step],
            currentStep: step
          }
        })),
        
      resetProgress: () =>
        set({
          userData: {
            completedSteps: [],
            currentStep: 'landing',
            startedAt: new Date()
          },
          currentStep: 'landing'
        })
    }),
    {
      name: 'hero-storage',
      version: 1
    }
  )
); 