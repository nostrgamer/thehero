import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserData, HeroStep } from '../types';

// Session timeout: 10 minutes (in milliseconds)
const SESSION_TIMEOUT = 10 * 60 * 1000;

interface AppState {
  userData: UserData;
  currentStep: HeroStep;
  
  // Actions
  updateUserData: (data: Partial<UserData>) => void;
  setCurrentStep: (step: HeroStep) => void;
  completeStep: (step: string) => void;
  resetProgress: () => void;
  updateActivity: () => void;
  checkSessionTimeout: () => boolean;
}

const createInitialUserData = (): UserData => ({
  completedSteps: [],
  currentStep: 'landing',
  startedAt: new Date(),
  lastActiveAt: new Date()
});

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      userData: createInitialUserData(),
      currentStep: 'landing',
      
      updateUserData: (data) => {
        set((state) => ({
          userData: { 
            ...state.userData, 
            ...data,
            lastActiveAt: new Date()
          }
        }));
      },
        
      setCurrentStep: (step) => {
        set({ 
          currentStep: step,
          userData: {
            ...get().userData,
            lastActiveAt: new Date()
          }
        });
      },
      
      completeStep: (step) => {
        set((state) => ({
          userData: {
            ...state.userData,
            completedSteps: [...state.userData.completedSteps, step],
            currentStep: step,
            lastActiveAt: new Date()
          }
        }));
      },
        
      resetProgress: () => {
        set({
          userData: createInitialUserData(),
          currentStep: 'landing'
        });
      },

      updateActivity: () => {
        set((state) => ({
          userData: {
            ...state.userData,
            lastActiveAt: new Date()
          }
        }));
      },

      checkSessionTimeout: () => {
        const { userData } = get();
        const now = new Date().getTime();
        const lastActive = new Date(userData.lastActiveAt).getTime();
        
        if (now - lastActive > SESSION_TIMEOUT) {
          // Session expired, reset to landing
          get().resetProgress();
          return true;
        }
        return false;
      }
    }),
    {
      name: 'hero-storage',
      version: 2, // Increment version for the schema change
      migrate: (persistedState: any, version: number) => {
        // Handle migration from version 1 to 2
        if (version === 1) {
          return {
            ...persistedState,
            userData: {
              ...persistedState.userData,
              lastActiveAt: new Date() // Set current time for existing users
            }
          };
        }
        return persistedState;
      }
    }
  )
); 